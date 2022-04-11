const translate = require("node-google-translate-skidz");
const prompt = require("prompt-sync")();
const fs = require("fs");
const path = "temp.txt";

console.log("select 1 for translate sentence, select 2 for translate from file");
switch (prompt("Select mode: ")) {
  case "1":
    console.log("you choose number 1, Please enter the text that you want to translate")
    translate(
      {
        text: prompt("Text: "),
        source: prompt("Source language: "),
        target: prompt("Target language: "),
      },
      function (result) {
        let arr = JSON.stringify(result);
        arr = {
          result: result.translation,
        };
        console.log("Result:", result.translation);
      }
    );
    break;
  case "2":
    console.log("you choose number 2, translate text from file")
    fs.readFile(path, "utf-8", (err, data) => {
      console.log("Text: ", data);
      translate(
        {
          text: data,
          source: prompt("Source language: "),
          target: prompt("Target language: "),
        },
        function (result) {
          let arr = JSON.stringify(result);
          arr = {
            result: result.translation,
          };

          const data = result.translation;
          fs.writeFile(path, data, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
          });

          setTimeout(() => {
            fs.readFile("temp.txt", "utf-8", (err, data) => {
              console.log("Result:", data);
            });
          }, 1000)
        }
      );
    });
    break;
  default:
    console.log("wrong input");
    break;
}