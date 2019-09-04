/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface ToggleSlider {}
}

declare global {


  interface HTMLToggleSliderElement extends Components.ToggleSlider, HTMLStencilElement {}
  var HTMLToggleSliderElement: {
    prototype: HTMLToggleSliderElement;
    new (): HTMLToggleSliderElement;
  };
  interface HTMLElementTagNameMap {
    'toggle-slider': HTMLToggleSliderElement;
  }
}

declare namespace LocalJSX {
  interface ToggleSlider extends JSXBase.HTMLAttributes<HTMLToggleSliderElement> {
    'onOnChange'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'toggle-slider': ToggleSlider;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


