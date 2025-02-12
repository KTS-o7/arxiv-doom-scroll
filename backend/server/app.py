from flask import Flask, request, jsonify
from flask_cors import CORS
from .utils import arxiv_service, ArxivQueryParams
import asyncio

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # Your React app's URL
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.route('/api/papers', methods=['GET'])
async def get_papers():
    try:
        # Log incoming request
        print("Received request for papers with args:", request.args)
        
        # Extract query parameters with defaults
        params = ArxivQueryParams(
            search_query=request.args.get('search_query', ''),
            id_list=request.args.getlist('id_list'),
            start=request.args.get('start', 0, type=int),
            max_results=request.args.get('max_results', 10, type=int),
            sortBy=request.args.get('sortBy', 'relevance'),
            sortOrder=request.args.get('sortOrder', 'descending')
        )

        print(f"Processing request with params: {params.dict()}")

        papers, metadata = await arxiv_service.fetch_papers(params)
        print(f"Retrieved {len(papers)} papers")
        
        # Format the response to match frontend expectations
        formatted_papers = [{
            'id': paper.id,
            'title': paper.title,
            'summary': paper.summary,
            'authors': [{'name': author.name} for author in paper.authors],
            'published': paper.published,
            'links': [{
                'href': link.href,
                'title': link.title,
                'type': link.type
            } for link in paper.links]
        } for paper in papers]

        response_data = {
            'papers': formatted_papers,
            'metadata': {
                'total_results': metadata.totalResults,
                'start_index': metadata.startIndex,
                'items_per_page': metadata.itemsPerPage
            }
        }
        print("Sending response with metadata:", response_data['metadata'])
        return jsonify(response_data)

    except Exception as e:
        print(f"Error in get_papers: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/paper/<paper_id>', methods=['GET'])
async def get_paper(paper_id):
    try:
        params = ArxivQueryParams(
            search_query='',
            id_list=[paper_id],
            start=0,
            max_results=1,
            sortBy='relevance',
            sortOrder='descending'
        )
        
        papers, _ = await arxiv_service.fetch_papers(params)
        if not papers:
            return jsonify({'error': 'Paper not found'}), 404
            
        return jsonify(papers[0].dict())

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test():
    print("Test endpoint hit")
    return jsonify({"message": "Server is running"})

# Cleanup when the application shuts down
@app.teardown_appcontext
async def teardown(exception):
    await arxiv_service.close()

if __name__ == '__main__':
    app.run(debug=True) 