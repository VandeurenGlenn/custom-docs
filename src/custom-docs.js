'use strict';
import LitMixin from './../../backed/mixins/lit-mixin.min.js';
import PropertyMixin from './../../backed/mixins/property-mixin.min.js';
import './../../custom-app-layout/src/custom-app-layout.js';
import './../../custom-header/custom-header.js';
import './../../custom-pages/custom-pages.js';

class CustomDocs extends LitMixin(PropertyMixin(HTMLElement)) {
  get pages() {
    return this.shadowRoot.querySelector('custom-pages');
  }
  constructor() {
    const properties = {
      documentation: {
        observer: '__updateFrames',
        value: 'docs'
      },
      demo: {
        observer: '__updateFrames',
        value: 'demo'
      }
    }
    super({properties});
  }
  __updateFrames() {
    this.shadowRoot.querySelector('.demo').src = this.demo;
    this.shadowRoot.querySelector('.documentation').src = this.documentation
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', ({path}) => {
      this.pages.selected = path[0].name === 'demo' ? 0 : 1;
    });
  }
  render() {
    this.firstRender = false;
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          --custom-header-background: #eee;
        }
        [slot="content"] {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          position: relative;
        }
        iframe {
          border: 1px solid #eee;
        }
        .demo {
          padding: 46px;
          box-sizing: border-box;
          max-width: 1400px;
        }

        [slot="toolbar"] {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
          height: 48px;
        }
        button {
          border: none;
          background: transparent;
          text-transform: uppercase;
          user-select: none;
          outline: none;
          cursor: pointer;
          padding: 8px;
          box-sizing: border-box;
        }
      </style>
      <custom-app-layout scrolls fullbleed>
        <custom-header fixed slot="header">
          <span slot="toolbar">
            <button name="demo">demo</button>
            <button name="documentation">documentation</button>
          </span>
        </custom-header>
        <span slot="content">
          <custom-pages>
            <iframe class="demo" width="100%" height="100%"></iframe>
            <iframe class="documentation" width="100%" height="100%"></iframe>
          </custom-pages>
        </span>

      </custom-app-layout>
    `;
  }
}
export default customElements.define('custom-docs', CustomDocs);
