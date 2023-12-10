/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  let results = {
    SearchTerm: searchTerm,
    Results: [],
  };

  for (let book of scannedTextObj) {
    for (let content of book.Content) {
      if (content.Text.includes(searchTerm)) {
        results.Results.push({
          page: content.Page,
          ISBN: book.ISBN,
          Line: content.Line,
        });
      }
    }
  }

  return results;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

//Positive test: Match found
const positiveTestResult = findSearchTermInBooks("momentum", twentyLeaguesIn);
if (positiveTestResult.Results.length > 0) {
  console.log("PASS: Positive Test - Match found");
} else {
  console.log("FAIL: Positive Test - Match not found");
}

//Negative test: No match found
const negativeTestResult = findSearchTermInBooks("unicorn", twentyLeaguesIn);
if (negativeTestResult.Results.length === 0) {
  console.log("PASS: Negative Test - No Match found");
} else {
  console.log("FAIL: Negative Test - Match found");
}

//Case-sensitiv test: Match found with different casing
try {
  const caseSensitiveTestResult = findSearchTermInBooks(
    "dark",
    twentyLeaguesIn
  );
  let caseSensitiveMatch = false;

  for (let result of caseSensitiveTestResult.Results) {
    console.log("ISBN:", result.ISBN);
    console.log("Line:", result.Line);

    try {
      const book = twentyLeaguesIn.find((book) => book.ISBN === result.ISBN);
      if (book && book.Content[result.Line - 1]) {
        const text = book.Content[result.Line - 1].Text;
        //console.log("Text;", text);
        // const text = twentyLeaguesIn[result.ISBN].Content[result.Line - 1].Text;
        console.log("Text:", text);
        if (text.includes("dark")) {
          caseSensitiveMatch = true;
          break;
        }
      } else {
        console.error(
          "Error accessing text content: Book or content not found"
        );
      }
    } catch (error) {
      console.error("Error accessing text content:", error);
    }
  }

  //   console.log(
  //     "Text:",
  //     twentyLeaguesIn[result.ISBN].Content[result.Line - 1].Text
  //   );
  //   if (
  //     twentyLeaguesIn[result.ISBN].Content[result.Line - 1].Text.includes("dark")
  //   ) {
  //     caseSensitiveMatch = true;
  //     break;
  //   }
  // }
  if (caseSensitiveMatch) {
    console.log("PASS: Case-sensitive Test - Match found with correct casing");
  } else {
    console.log(
      "FAIL: Case-sensitive Test - Match not found with correct casing"
    );
  }
} catch (error) {
  console.error("Error during case-sensitive test:", error);
}
