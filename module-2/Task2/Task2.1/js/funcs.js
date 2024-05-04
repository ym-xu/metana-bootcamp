var stringValue = "Hello World";
var numericValue = 1;
var arrayValue = [1, 2, 3];

var objectValue = {
    name: "xyz",
    id: 123,
    tags: ["tag1", "tag2"]
};

var greeting = "world";

function greet() {
    console.log("Hello " + greeting + "!");
    if (greeting === "world") {
      greeting = "javascript";
    } else if (greeting === "javascript") {
      greeting = "world";
    }
}

greet();

function formSubmitted() {
    alert("Form submitted successfully!");
}

function addToArray(arr, item) {
    arr.push(item);
    return arr;
}

function conditionalAlert(statusCode) {
    if (statusCode === 200) {
      alert("Success!");
    } else {
      alert("Error!");
    }
}

formSubmitted();
console.log(addToArray(arrayValue, 6));
conditionalAlert(200);