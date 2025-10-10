/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ice-planner`
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  constructor() {
    super();
    this.teamName = "Penguins";
    this.jerseyCost = 88;
    this.playerAmount = 1;
    this.iceCost = 300;
    this.hours = 50;
    this.overhead = 0.02;
    this.coachCost = 3000;
    this.coachAmount = 1;
    this.totalJersey = 0;
    this.totalIce = 0;
    this.totalCoach = 0;
    this.totalOverhead = 0;
    this.totalCost = 0;
    this.logo = "https://www.wanderlustmagazine.com/wp-content/uploads/2024/03/dreamstime_xl_41534027.jpg";
  }

  // Lit reactive properties. I can't tell if spamming variables was the best way to do this but it seemed to work.
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      jerseyCost: { type: Number },
      playerAmount: { type: Number },
      iceCost: { type: Number },
      hours: { type: Number },
      overhead: { type: Number },
      coachCost: { type: Number },
      coachAmount: { type: Number },
      totalJersey: { type: Number },
      totalIce: { type: Number },
      totalCoach: { type: Number },
      totalOverhead: { type: Number },
      totalCost: { type: Number },
      logo: { type: String },
    };
  }

  // Lit scoped styles. Majority is HAX template, rest is mine from past projects.
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--ice-planner-label-font-size, var(--ddd-font-size-s));
      }
      label {
        display: block;
        margin-top: var(--ddd-spacing-2);
        font-weight: bold;
      }
      input {
        display: block;
        margin-top: 6px;
        padding: 6px;
        font-size: 1rem;
        width: 100%;
        max-width: 200px;
      }

      button {
        background-color: var(--ddd-theme-default, #cdf9fa);
        font-size: 1rem;
        padding: var(--ddd-spacing-2, 16px) var(--ddd-spacing-3, 16px);
        border: none;
        border-radius: 16px;
        cursor: pointer;
      }

      button:hover {
        background-color: var(--ddd-theme-default-hover, #c4c4c4);
        transform: translateY(-1px);
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
      }

      .results {
        margin-top: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-secondary, #f0f0f0);
        border-radius: 8px;
      }

      .resultsPage {
        font-weight: bold;
        margin-top: var(--ddd-spacing-4);
      }
      .logo-section {
      text-align: left;
      margin-bottom: var(--ddd-spacing-4);
      }

      .team-logo {
      max-width: 180px;
      max-height: 180px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="logo-section">
      <img src="${this.logo}" alt="${this.teamName} Logo" class="team-logo" />
      </div>
        <label>Number of Players:</label>
        <input 
          type="number" 
          .value="${String(this.playerAmount)}" 
          @input="${e => this.playerAmount = Number(e.target.value)}"
          min="1"
        />

        <label>Ice Cost per Hour:</label>
        <input 
          type="number" 
            .value="${String(this.iceCost)}" 
          @input="${e => this.iceCost = Number(e.target.value)}"
          min="1"
        />

        <label>Total Ice Hours:</label>
        <input 
          type="number" 
            .value="${String(this.hours)}" 
          @input="${e => this.hours = Number(e.target.value)}"
          min="1"
        />

        <label>Number of Coaches:</label>
        <input 
          type="number" 
            .value="${String(this.coachAmount)}" 
          @input="${e => this.coachAmount = Number(e.target.value)}"
          min="1"
        />

        <button @click="${this._calculateTotals}">Calculate</button>
        <div class="resultsPage">Results for ${this.teamName}</div>
        <div class="results">
        Jersey Cost: $${this.totalJersey}<br>
        Ice Cost: $${this.totalIce}<br>
        Coach Cost: $${this.totalCoach}<br>
        Overhead: $${this.totalOverhead}<br>
        <strong>Total Cost: $${this.totalCost}</strong>
        </div>
  </div>
        <slot></slot>
    `;
  }

  // This calculates all my totals. 
  // Originally, I had individual methods for every different 
  // calculation, which was really dumb. Thanks AI for the correction.
  _calculateTotals() {
    this.totalJersey = this.jerseyCost * this.playerAmount;
    this.totalIce = this.iceCost * this.hours;
    this.totalCoach = this.coachCost * this.coachAmount;
  
    this.totalOverhead = (this.totalIce + this.totalCoach + this.totalJersey) * this.overhead;

    this.totalCost = this.totalIce + this.totalCoach + this.totalJersey + this.totalOverhead;
  }  
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);