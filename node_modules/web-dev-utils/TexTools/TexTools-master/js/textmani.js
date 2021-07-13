//Duplicate Removing Function
function dupesRemover() {
    $("#success").html("");
    let dupesInput = $("#inputText").val().trim().split("\n"); //Trims and Generates Array from Input data.
    let dupes = new Set(dupesInput); //Set is used to remove duplicates as it creates a unique new array.
    let dupesRemoved = Array.from(dupes); //The new set needs to be converted back to array.
    let dupesCount = (dupesInput.length - dupesRemoved.length); //Counts number of duplicates removed.
    dupesRemoved = dupesRemoved.join("\n"); //Now, we join the Array values back into the string with line breaks.

    $("#dupesCountTag").html(dupesCount + " Removed") //Duplicate Count output!
    $("#inputLabel").html("Output:");
    $("#inputText").val(dupesRemoved);

}

//Data Sorting Function
function sortData() {
    let sortData = $("#inputText").val().trim().split("\n"); //Trims and Generates Array from Input data.Trims and Generates Array from Input data.
    let sortedData = sortData.sort(); //Sorts data in ascending order.
    let sortOpion = $("#sortOption").val() //Gets the option value from html. Ascending or descending.
    if (sortOpion === "ascending") {
        sortedData = sortedData.join("\n");
    } else if (sortOpion === "descending") {
        sortedData = sortedData.reverse(); //Reverses the already sorted data to convert it in descending order.
        sortedData = sortedData.join("\n");
    }

    $("#inputLabel").html("Output:");
    $("#inputText").val(sortedData);

}

//Find and Replace text function
function findAndReplace() {
    let text = $("#inputText").val(); //The input text in which we will find and replace text.
    let find = $("#find").val(); //The text function will be finding.
    find = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //This is used to escape characters which can cause problems for the program to run.
    //The above replace expression for user input was found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    let replace = $("#replace").val(); //The text it will be replaced with.

    let allReplace = new RegExp(find, "g"); //The RegExp object will remove all the text found.
    let oneReplace = new RegExp(find); //It will only replace once.

    if ($("#replaceAll").is(':checked')) { //Checking if the option for Replace is checked
        let replacedText = text.replace(allReplace, replace);
        //Variables declared by let dosen't works inside because it is limited to block code.
    } else {
        let replacedText = text.replace(oneReplace, replace);
    }

    $("#inputLabel").html("Output:");
    $("#inputText").val(replacedText);

}

function compareLists() {
    let originalList = $("#inputText").val().split("\n"); //Gets the Value
    let listToBeDupesDeletedFrom = $("#inputTextTwo").val().split("\n"); //Gets the Value

    //For loop to compare original List with list from which duplicates need to be removed from.
    for (let i = 0; i < originalList.length; i++) {
        let index = listToBeDupesDeletedFrom.indexOf(originalList[i]); //It uses index of to check if first line from array exists in the second file.
        if (index > -1) { //If it exists then the answer will be more than -1 and if it dosen't then answer will be -1
            listToBeDupesDeletedFrom.splice(index, 1); //If it exists then we can use the answer of the index with splice object. We tell first where to start from and then how many values to remove.
        }
    }

    listToBeDupesDeletedFrom = listToBeDupesDeletedFrom.join("\n"); //New new list which needs to be used in iMacros is joined to form a string which is easily readable in HTML.
    $("#InputandOutput").html("<label><h5>Output Text:</h5></label><textarea class = \"form-control\" id =\"inputText\" rows =\"10\">" + listToBeDupesDeletedFrom + "</textarea>")

}

//Add Prefix and Suffix to each Line function
function addPrefixSuffix() {
    let text = $("#inputText").val().trim().split("\n"); //The input text
    let replace = $("#replace").val(); //The text it will be replaced with
    let option = $("#prefixSuffix").val() //To find out what user has selected. Prefix or Suffix
    let replacedText = []; //Array for the final Result
    let regString = ""; //Initializing variable for Regex string

    //If statement to check if we need to add suffix or prefix. Then regex string is defined accordingly
    if (option === "prefix") {
        regString = /^/g; //Regex string for Prefix
    } else if (option === "suffix") {
        regString = /$/g; //Regex string for the Suffix
    }

    //For loop to add Prefix and Suffix depending on the above if statement. 
    for (let i = 0; i < text.length; i++) {
        replacedText.push(text[i].replace(regString, replace));
    }

    //Converts the array back to string with line breaks. It is needed for the output.
    replacedText = replacedText.join("\n");

    $("#inputLabel").html("Output:"); //Label changed from Input to Output
    $("#inputText").val(replacedText); //Printing out the results in the same box.
}

function whiteSpaceRemove() {
    let text = $("#inputText").val().trim(); //Gets input text and trims it.
    let whiteSpaceRemovedText = text.replace(/\r?\n|\r/g, ''); //Regex for removing line breaks from string.
    whiteSpaceRemovedText = whiteSpaceRemovedText.replace(/ /g, ''); //Removing whitespace using Regex now.
    whiteSpaceRemovedText = whiteSpaceRemovedText.replace(/\s/g, ""); //Another Regex for whitespace remover. Just in case!


    $("#inputLabel").html("Output:"); //Label changed from Input to Output
    $("#inputText").val(whiteSpaceRemovedText); //Printing out the results in the same box.

}

function replaceLineBreaks() {
    let text = $("#inputText").val().trim(); //Gets input text and trims it.
    let replace = $("#replace").val(); //The text it will be replaced with
    let lineBreaksReplaced = text.replace(/\r?\n|\r/g, replace); //Regex for replacing line breaks from string.

    $("#inputLabel").html("Output:"); //Label changed from Input to Output
    $("#inputText").val(lineBreaksReplaced); //Printing out the results in the same box.
    
}

function letterCaseConverter() {
    let text = $("#inputText").val().trim(); //Gets input text and trims it.
    let option = $("#options").val() //To find out what user has selected. Prefix or Suffix
    
    if (option === "uppercase") {
        let convertedLetterCase = text.toUpperCase();
    } else if (option === "lowercase") {
        let convertedLetterCase = text.toLowerCase();
    }

    $("#inputLabel").html("Output:"); //Label changed from Input to Output
    $("#inputText").val(convertedLetterCase); //Printing out the results in the same box.
}