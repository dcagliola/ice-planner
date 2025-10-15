/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";

export class IceResults extends LitElement {
  static get tag() {
    return "ice-results";
  }

  static get properties() {
    return {
      teamName: { type: String },
      totalJersey: { type: Number },
      totalIce: { type: Number },
      totalCoach: { type: Number },
      totalOverhead: { type: Number },
      totalCost: { type: Number },
      costPerPlayer: { type: Number },
    };
  }

  constructor() {
    super();
    this.teamName = "Penguins";
    this.totalJersey = 0;
    this.totalIce = 0;
    this.totalCoach = 0;
    this.totalOverhead = 0;
    this.totalCost = 0;
    this.costPerPlayer = 0;
  }

  static get styles() {
    return css`
      .results-container {
        margin-top: 16px;
        padding: 16px;
        background-color: var(--background-color, #fff);
        color: var(--text-color, #000);
        border: 2px solid black;
        border-radius: 8px;
      }

      .results-title {
        font-weight: bold;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }

      @media (prefers-color-scheme: dark) {
        .results-container {
          border-color: white;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="results-container">
        <div class="results-title">Results for ${this.teamName}</div>
        Jersey Cost: $${this.totalJersey}<br />
        Ice Cost: $${this.totalIce}<br />
        Coach Cost: $${this.totalCoach}<br />
        Overhead: $${this.totalOverhead}<br />
        <strong>Total Cost: $${this.totalCost}</strong><br />
        <strong>Cost per Player: $${this.costPerPlayer.toFixed(2)}</strong>
      </div>
    `;
  }
}

globalThis.customElements.define("ice-results", IceResults);

