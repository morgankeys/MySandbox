const appDiv = document.querySelector('.app');
appDiv.innerHTML = '<div class="frame"><h1>Hello World!!</h1></div>';

class MyElement extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow DOM to the custom element.
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create some content inside the shadow DOM.
      const wrapper = document.createElement('span');
      wrapper.textContent = "Hello, I'm a custom element!";
  
      // Append the created elements to the shadow DOM.
      shadow.appendChild(wrapper);
    }
  }
  
  // Define the new custom element.
  customElements.define('my-element', MyElement);
  