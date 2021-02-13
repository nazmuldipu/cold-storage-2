import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'render-input',
  templateUrl: './render-input.component.html',
  styleUrls: ['./render-input.component.scss']
})
export class RenderInputComponent implements OnInit {
  @Input() type = 'text';
  @Input() isRequired: boolean = false;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() name: string = null;
  @Input() placeholder: string;
  @Input() errorMsg: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
