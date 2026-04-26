const lab1_1 = require("./lab/lab1_1").lab
const example_1 = require("./example_1").lab;
const lab2_2 = require("./lab/lab2_2").lab;
const lab2_3 = require("./lab/lab2_3").lab;
const lab3 = require("./lab/lab3").lab;

const PORT = 8080;

const urlMap = [
	{path: "/", action:__dirname + "/static/index.html"},	 
	{path: "/digest", action: lab1_1},	
	{path: "/example_1", action: example_1},
	{path: "/lab2_2", action: lab2_2},
	{path: "/lab2_3", action: __dirname + "/static/lab2_3.html"},
	{path: "/lab2_3_launch", action: lab2_3},
	{path: "/lab3", action: __dirname + "/static/lab3.html"},
	{path: "/lab3_asg_update", action: lab3},
	];

const service = require("./lib/service").http(urlMap);

service(PORT);

