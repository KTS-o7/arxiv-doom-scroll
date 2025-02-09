import { ArxivResponse } from "./types";

export const mockArxivResponse: ArxivResponse = {
  feed: {
    title: "ArXiv Query: search_query=cat:cs.NE&id_list=&start=0&max_results=2",
    id: "http://arxiv.org/api/iVpCLsfwIHKi1yUIPOb+PA+tCd0",
    updated: "2025-02-09T00:00:00-05:00",
    opensearch: {
      totalResults: 15498,
      startIndex: 0,
      itemsPerPage: 2,
    },
    entries: [
      {
        id: "http://arxiv.org/abs/cs/9809049v1",
        title: "Aspects of Evolutionary Design by Computers",
        summary:
          "This paper examines the four main types of Evolutionary Design by computers: Evolutionary Design Optimisation, Evolutionary Art, Evolutionary Artificial Life Forms and Creative Evolutionary Design. Definitions for all four areas are provided. A review of current work in each of these areas is given, with examples of the types of applications that have been tackled. The different properties and requirements of each are examined. Descriptions of typical representations and evolutionary algorithms are provided and examples of designs evolved using these techniques are shown. The paper then discusses how the boundaries of these areas are beginning to merge, resulting in four new 'overlapping' types of Evolutionary Design: Integral Evolutionary Design, Artificial Life Based Evolutionary Design, Aesthetic Evolutionary AL and Aesthetic Evolutionary Design. Finally, the last part of the paper discusses some common problems faced by creators of Evolutionary Design systems, including: interdependent elements in designs, epistasis, and constraint handling.",
        published: "1998-09-23T11:01:55Z",
        updated: "1998-09-23T11:01:55Z",
        authors: [
          {
            name: "Peter J Bentley",
          },
        ],
        comment:
          "In Proceedings of the 3rd On-line World Conference on Soft Computing in Engineering Design and Manufacturing (WSC3)",
        categories: [
          {
            term: "cs.NE",
            scheme: "http://arxiv.org/schemas/atom",
          },
          {
            term: "A.1;E.2;F.4.1;I.2.0;I.2.6;I.2.8;I.2.9;I.2.11;I.3.5;I.6.0;J.6",
            scheme: "http://arxiv.org/schemas/atom",
          },
        ],
        primaryCategory: {
          term: "cs.NE",
          scheme: "http://arxiv.org/schemas/atom",
        },
        links: [
          {
            href: "http://arxiv.org/abs/cs/9809049v1",
            rel: "alternate",
            type: "text/html",
          },
          {
            href: "http://arxiv.org/pdf/cs/9809049v1",
            rel: "related",
            type: "application/pdf",
            title: "pdf",
          },
        ],
      },
      {
        id: "http://arxiv.org/abs/cs/9812002v1",
        title:
          "Training Reinforcement Neurocontrollers Using the Polytope Algorithm",
        summary:
          "A new training algorithm is presented for delayed reinforcement learning problems that does not assume the existence of a critic model and employs the polytope optimization algorithm to adjust the weights of the action network so that a simple direct measure of the training performance is maximized. Experimental results from the application of the method to the pole balancing problem indicate improved training performance compared with critic-based and genetic reinforcement approaches.",
        published: "1998-12-03T09:08:03Z",
        updated: "1998-12-03T09:08:03Z",
        authors: [
          {
            name: "A. Likas",
          },
          {
            name: "I. E. Lagaris",
          },
        ],
        categories: [
          {
            term: "cs.NE",
            scheme: "http://arxiv.org/schemas/atom",
          },
          {
            term: "C.1.3",
            scheme: "http://arxiv.org/schemas/atom",
          },
        ],
        primaryCategory: {
          term: "cs.NE",
          scheme: "http://arxiv.org/schemas/atom",
        },
        links: [
          {
            href: "http://arxiv.org/abs/cs/9812002v1",
            rel: "alternate",
            type: "text/html",
          },
          {
            href: "http://arxiv.org/pdf/cs/9812002v1",
            rel: "related",
            type: "application/pdf",
            title: "pdf",
          },
        ],
      },
    ],
  },
};
