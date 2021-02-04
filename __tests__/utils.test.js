const {
  formatArticlesData,
  formatCommentsData,
  createArticleLookup
} = require('../db/utils/data-manipulation');

let testArticles;

beforeEach(() => {
  testArticles = [
    {
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: 1471522072389
    },
    {
      title:
        "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      topic: 'coding',
      author: 'jessjelly',
      body:
        'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
      created_at: 1500584273256
    }
  ];
});

describe('formatArticlesData', () => {
  it('returns a new empty array when passed an empty array', () => {
    const input = [];
    const output = formatArticlesData(input);
    expect(input).not.toBe(output);
    expect(output).toEqual([]);
  });
  it('returns an object with formatted created_at property', () => {
    const input = testArticles;
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: new Date(1471522072389)
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: new Date(1500584273256)
      }
    ];
    expect(formatArticlesData(input)).toEqual(expected);
  });
  it('input is not mutated', () => {
    formatArticlesData(testArticles);
    expect(testArticles).toEqual([
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1500584273256
      }
    ]);
  });
});

let testComment1;
let testComment2;
let resComment1;
let resComment2;
let testArticlesLookup;

beforeEach(() => {
  testComment1 = {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    created_by: 'butter_bridge',
    votes: 16,
    created_at: 1511354163389
  };
  testComment2 = {
    body:
      'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'butter_bridge',
    votes: 14,
    created_at: 1479818163389
  };
  resComment1 = {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    article_id: 9,
    username: 'butter_bridge',
    votes: 16,
    created_at: new Date(1511354163389)
  };
  resComment2 = {
    body:
      'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    article_id: 1,
    username: 'butter_bridge',
    votes: 14,
    created_at: new Date(1479818163389)
  };
  testArticlesLookup = {
    "They're not exactly dogs, are they?": 9,
    'Living in the shadow of a great man': 1
  };
});

describe('formatCommentsData()', () => {
  it('changes single user key and article title to id', () => {
    expect(formatCommentsData([testComment1], testArticlesLookup)).toEqual([
      resComment1
    ]);
  });
  it('changes multiple user keys and article titles to ids', () => {
    expect(
      formatCommentsData([testComment1, testComment2], testArticlesLookup)
    ).toEqual([resComment1, resComment2]);
  });
  it('input is not mutated', () => {
    let inputComments = [{ ...testComment1 }, { ...testComment2 }];
    let inputLookup = { ...testArticlesLookup };
    formatCommentsData(inputComments, inputLookup);
    expect(inputComments).toEqual([testComment1, testComment2]);
    expect(inputLookup).toEqual(testArticlesLookup);
  });
});

let testArticle1;
let testArticle2;
let resArticleLookup1;
let resArticleLookup2;

beforeEach(() => {
  testArticle1 = {
    article_id: 1,
    title: 'Living in the shadow of a great man',
    body: 'I find this existence challenging',
    votes: 100,
    topic: 'mitch',
    author: 'butter_bridge',
    created_at: '2018-11-15T12:21:54.171Z'
  };
  testArticle2 = {
    article_id: 2,
    title: 'Sony Vaio; or, The Laptop',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    votes: 0,
    topic: 'mitch',
    author: 'icellusedkars',
    created_at: '2014-11-16T12:21:54.171Z'
  };
  resArticleLookup1 = { 'Living in the shadow of a great man': 1 };
  resArticleLookup2 = {
    'Living in the shadow of a great man': 1,
    'Sony Vaio; or, The Laptop': 2
  };
});

describe('createArticleLookup()', () => {
  it('creates a single kv pair lookup', () => {
    expect(createArticleLookup([testArticle1])).toEqual(resArticleLookup1);
  });
  it('creates multiple kv pair lookup', () => {
    expect(createArticleLookup([testArticle1, testArticle2])).toEqual(
      resArticleLookup2
    );
  });
  it('input is not mutated', () => {
    let input = [{ ...testArticle1 }, { ...testArticle2 }];
    createArticleLookup(input);
    expect(input).toEqual([testArticle1, testArticle2]);
  });
});
