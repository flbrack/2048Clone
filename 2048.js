var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

var c = canvas.getContext('2d');

window.addEventListener('keydown', keyPush);

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	drawGame();
})


const sidelength = 80;
const pad = 2;
var hmargin = innerWidth/2 - 2*(sidelength+pad);
var vmargin = innerHeight/2 - 2*(sidelength+pad);

var grid = [[2,16,8,16],[128,64,128,256],[2,1024,32,8],[64,0,0,0]];
//var grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
addSquare();

var gridcheck = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

const col0 = '#D9FCFC';
const col2 = '#CCFFFF';
const col4 = '#99FFFF';
const col8 = '#66FFFF';
const col16 = '#33FFFF';
const col32 = '#00FFFF';
const col64 = '#66B2FF';
const col128 = '#3399FF';
const col256 = '#0080FF';
const col512 = '#6666FF';
const col1024 = '#3333FF';
const col2048 = '#0000FF';

const colorDict = {
	0 : col0,
	2 : col2,
	4 : col4,
	8 : col8,
	16 : col16,
	32 : col32,
	64 : col64,
	128 : col128,
	256 : col256,
	512 : col512,
	1024 : col1024,
	2048 : col2048,
};

function drawGame(){
	c.clearRect(0,0,innerWidth,innerHeight)
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			c.fillStyle = colorDict[grid[j][i]];
			c.fillRect(hmargin+((sidelength+pad)*i), vmargin+((sidelength+pad)*j), sidelength, sidelength);
			if (grid[j][i]==0){
				continue;
			} else {
				c.font="30px Arial";
				c.fillStyle = 'black';
				c.fillText(grid[j][i], sidelength/2+hmargin+i*(sidelength)-sidelength/3, sidelength/2+vmargin+j*(sidelength)+sidelength/6);
				}
			}
			
	}
}

drawGame()

function updateGame(keyCode){
	
	for (var i=0; i<4;i++) {
		for (var j =0;j<4; j++) {
			gridcheck[i][j]=grid[i][j];
		}
	}


	switch(keyCode) {
        case 37: // left
        	for (var i=0; i<3; i++) Left(grid);
        	leftMerge(grid);
        	for (var i=0; i<3; i++) Left(grid);
            break;

        case 38: // up
            for (var i =0; i<3; i++) Up(grid);
        	upMerge(grid);
        	for (var i =0; i<3; i++) Up(grid);
            break;

        case 39: // right
            for (var i =0; i<3; i++) Right(grid);
        	rightMerge(grid);
        	for (var i =0; i<3; i++) Right(grid);

            break;

        case 40: // down
            for (var i =0; i<3; i++) Down(grid);
        	downMerge(grid);
        	for (var i =0; i<3; i++) Down(grid);
            break;
    }

    var checker = 0;
    for (var i=0; i<4;i++) {
		for (var j =0;j<4; j++) {
			if(gridcheck[i][j]==grid[i][j]) checker++;
		}
	}
	if (checker!=16) addSquare();

    drawGame();
    winCheck();
	loseCheck();
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            updateGame(37); // left
            break;
        case 38:
			updateGame(38); // up
            break;
        case 39:
			updateGame(39); //right
            break;
        case 40:
			updateGame(40); // down
            break;
    }
}

function Left(grid){
	for (var i=0; i<4; i++){
		for (var j=3; j>=0; j--){
			
			if (j==3 && grid[i][j-1]==0){
				grid[i][j-1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==2 && grid[i][j-1]==0 && grid[i][j]!=0){
				
				grid[i][j-1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==1 && grid[i][j-1]==0 && grid[i][j]!=0){ 
				
				grid[i][j-1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==0 && grid[i][j]==0){
				grid[i][j] = grid[i][j+1];
			}
		}
	}
}

function Right(grid){
	for (var i=0; i<4; i++){
		
		for (var j=0; j<4; j++){
			
			if (j==0 && grid[i][j+1]==0){
				grid[i][j+1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==2 && grid[i][j+1]==0 && grid[i][j]!=0){
				
				grid[i][j+1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==1 && grid[i][j+1]==0 && grid[i][j]!=0){ 
				
				grid[i][j+1] = grid[i][j];
				grid[i][j] = 0;

			} else if (j==3 && grid[i][j]==0){
				grid[i][j] = grid[i][j-1];
			}
		}
	}
}

function Up(grid){
	for (var j=0; j<4; j++){
		
		for (var i=3; i>=0; i--){
			
			if (i==3 && grid[i-1][j]==0){
				grid[i-1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==2 && grid[i-1][j]==0 && grid[i][j]!=0){
				
				grid[i-1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==1 && grid[i-1][j]==0 && grid[i][j]!=0){ 
				
				grid[i-1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==0 && grid[i][j]==0){
				grid[i][j] = grid[i+1][j];
			}
		}
	}
}

function Down(grid){
	for (var j=0; j<4; j++){
		
		for (var i=0; i<4; i++){
			
			if (i==0 && grid[i+1][j]==0){
				grid[i+1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==2 && grid[i+1][j]==0 && grid[i][j]!=0){
				
				grid[i+1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==1 && grid[i+1][j]==0 && grid[i][j]!=0){ 
				
				grid[i+1][j] = grid[i][j];
				grid[i][j] = 0;

			} else if (i==3 && grid[i][j]==0){
				grid[i][j] = grid[i-1][j];
			}
		}
	}
}

function leftMerge(grid){
	for (var i=0; i<4;i++){
		for (var j=0;j<3;j++){
			if (grid[i][j]==grid[i][j+1]){
				grid[i][j]= 2*grid[i][j];
				grid[i][j+1]=0;
			}

		}
	}
}

function rightMerge(grid){
	for (var i=0; i<4;i++){
		for (var j=3;j>=1;j--){
			if (grid[i][j]==grid[i][j-1]){
				grid[i][j]= 2*grid[i][j];
				grid[i][j-1]=0;
			}

		}
	}
}

function upMerge(grid){
	for (var j=0; j<4;j++){
		for (var i=0;i<3;i++){
			if (grid[i][j]==grid[i+1][j]){
				grid[i][j]= 2*grid[i][j];
				grid[i+1][j]=0;
			}

		}
	}
}

function downMerge(grid){
	for (var j=0; j<4;j++){
		for (var i=3;i>=1;i--){
			if (grid[i][j]==grid[i-1][j]){
				grid[i][j] = 2*grid[i][j];
				grid[i-1][j]=0;
			}

		}
	}
}

function addSquare(){
	var candArray = [];
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if (grid[i][j]==0){
				candArray.push([i,j])
			}
		}
	}

	var chosenIndex = Math.floor(Math.random()*candArray.length);


	if (Math.random()<=0.1){
		var num = 4;
	} else var num = 2;

	var i = candArray[chosenIndex][0];
	var j = candArray[chosenIndex][1]
	grid[i][j] = num;
}

function loseCheck(){
	var grid2 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	var check = 0;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			grid2[i][j] = grid[i][j];
			if (grid[i][j]!=0) check++;
		}
	}
	leftMerge(grid2);
	rightMerge(grid2);
	upMerge(grid2);
	downMerge(grid2);

	drawGame();
	var check2 = 0;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if (grid2[i][j] == grid[i][j]) check2++;
		}
	}

	if (check2==16 && check==16){
		drawGame();
		gameOver();
	}
}

function winCheck(){
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if (grid[i][j]==2048) gameOver(win=true);
		}
	}
}

function gameOver(win=false){
	if (win){
		if (window.confirm('Congratulations! You won!\nWould you like to play again?')){
			grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			addSquare();
			drawGame();
		}
	} else {
		if (window.confirm('You lost.\nWould you liket to play again?')){
			grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			addSquare();
			drawGame();
		}
	}
}











