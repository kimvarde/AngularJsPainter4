import { Component} from '@angular/core';
import { AfterViewInit} from '@angular/core';
import { ViewChild} from '@angular/core';
import { ElementRef} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {  
  @ViewChild('canvasRefElement') canvasRef: ElementRef;
  title = 'app';
  textColor = 'red';
  buttonStatus = 'enabled';
  titleClass = 'red-title';
  
  DrawingStarted = false;
  prevX = -1;
  prevY = -1;
  brushSize = 10;
  useGradient = false;
  canvasWidth = 800;
  canvasHeight = 480;
  ctx: CanvasRenderingContext2D = null;
  ngAfterViewInit() {
    console.debug('ngOnInit called')
    this.ctx = this.canvasRef.nativeElement.getContext('2d');  
  }

  RGBInputs = [
    {
        Text: 'Red',
        ColorValue: 0,
        Min: 0,
        Max: 254,
        Keyup: "handleKey($event, 'R')",
        BtnStyle: "btn-danger"
    },
    {
        Text: 'Green',
        ColorValue: 0,
        Min: 0,
        Max: 254,
        Keyup: "handleKey($event, 'G')",
        BtnStyle: "btn-success"
    },
    {
        Text: 'Blue',
        ColorValue: 0,
        Min: 0,
        Max: 254,
        Keyup: "handleKey($event, 'B')",
        BtnStyle: "btn-primary"
    }
  
];



getRgbColor = function ()
{  
    if (this.useGradient) {
        var gradient = this.ctx.createLinearGradient(0, 0, 0, 480);
        gradient.addColorStop("0", "rgb(" + this.RGBInputs[0].ColorValue + ",0,0)");
        gradient.addColorStop("0.20", "rgb(0," + this.RGBInputs[1].ColorValue + ",0)");
        gradient.addColorStop("0.40", "rgb(0,0," + this.RGBInputs[2].ColorValue + ")");
        gradient.addColorStop("0.60", "rgb(" + this.RGBInputs[0].ColorValue + ",0,0)");
        gradient.addColorStop("0.80", "rgb(0," + this.RGBInputs[1].ColorValue + ",0)");
        gradient.addColorStop("1.0", "rgb(0,0," + this.RGBInputs[2].ColorValue + ")");
        return gradient;       
    }
    else {
        return "rgb(" + this.RGBInputs[0].ColorValue + "," + this.RGBInputs[1].ColorValue + "," + this.RGBInputs[2].ColorValue + ")";
    }
}

palleteStyle = function () {
  return {      
      "background-color": this.getRgbColor()                
  };
}

canvasStart = function (event) {
  console.debug("canvasStart");
  this.DrawingStarted = true;            
  this.prevX = -1;
  this.prevY = -1;
  this.ctx.beginPath();
  this.ctx.lineWidth = this.brushSize;
}
canvasDraw = function (event) {      
  if (this.DrawingStarted) {
      if (this.prevX == -1 && this.prevY == -1) {
          this.prevX = event.offsetX;
          this.prevY = event.offsetY;
      }
      this.ctx.moveTo(this.prevX, this.prevY);
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.strokeStyle = this.getRgbColor();
      this.ctx.stroke();
      this.prevX = event.offsetX;
      this.prevY = event.offsetY;
  }
}
canvasEnd = function (event) {
  this.DrawingStarted = false;            
}

clearDrawing = function () {
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

canvasRightclick = function (event) {
  this.ctx.fillStyle = this.getRgbColor(); 
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
}

  onAction = function(event){
    console.debug(event);
  }

  onKey(value : string){
    console.debug("key pressed " + value);
  }
}
