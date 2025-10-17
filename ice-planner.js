/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import "./ice-results.js";
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
    this.playerAmount = 1;
    this.iceCost = 300;
    this.hours = 50;
    this.coachAmount = 1;
    this.totalJersey = 0;
    this.totalIce = 0;
    this.totalCoach = 0;
    this.totalOverhead = 0;
    this.totalCost = 0;
    this.costPerPlayer = 0;
    this.logo = "https://www.wanderlustmagazine.com/wp-content/uploads/2024/03/dreamstime_xl_41534027.jpg";
  }

  // Lit reactive properties. I can't tell if spamming variables was the best way to do this but it seemed to work.
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      playerAmount: { type: Number },
      iceCost: { type: Number },
      hours: { type: Number },
      coachAmount: { type: Number },
      totalJersey: { type: Number },
      totalIce: { type: Number },
      totalCoach: { type: Number },
      totalOverhead: { type: Number },
      totalCost: { type: Number },
      logo: { type: String },
      costPerPlayer: { type: Number },
      shareURL: { type: String },
    };
  }

  // Lit scoped styles. Majority is HAX template, rest is mine from past projects.
  static get styles() {
    return [super.styles,
    css`
      :host {
        --background-color: #ffffff;
        --text-color: #000000;
        --accent-color: #8fbaf1;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --background-color: #121212;
          --text-color: #ffffff;
          --accent-color: #8ab4f8;
        }
      }

      :host[data-theme='dark'] {
        --background-color: #121212;
        --text-color: #ffffff;
        --accent-color: #8ab4f8;
      }

      :host[data-theme='light'] {
        --background-color: #ffffff;
        --text-color: #000000;
        --accent-color: #85afe7;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        /* Adaptive spacing and width */
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
        max-width: 600px;
        width: 90%;

        /* Theming support */
        background-color: var(--background-color);
        color: var(--text-color);
        border-radius: 12px;
      }

      :host {
        display: block;
        color: var(--text-color);
        background-color: var(--background-color);
        font-family: var(--ddd-font-navigation);
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
        background-color: var(--accent-color);
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid black;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        margin-top: var(--ddd-spacing-4);
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        border-color: color-mix(in srgb, var(--text-color) 60%, var(--accent-color) 40%);
        opacity: 0.95;
      }

      button:active {
        transform: translateY(0);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }


      .results {
        margin-top: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--background-color);
        border-radius: 8px;
        border: 2px solid black;
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
      @media (prefers-color-scheme: dark) {
        button {
          border: 2px solid white;
        }

        .results {
          border: 2px solid white;
        }
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
    <h1>Penguins Hockey Planner</h1>
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

        <button @click="${() => this._calculateTotals()}">Calculate</button>
        <ice-results
        .teamName=${this.teamName}
        .totalJersey=${this.totalJersey}
        .totalIce=${this.totalIce}
        .totalCoach=${this.totalCoach}
        .totalOverhead=${this.totalOverhead}
        .totalCost=${this.totalCost}
        .costPerPlayer=${this.costPerPlayer}
      ></ice-results>

    <button @click=${() => this.copyShareLink()}>Copy Share Link</button>

    </div>
    <slot></slot>
  `;
  }

  copyShareLink() {
    this.buildURL();
    navigator.clipboard
      .writeText(this.shareURL)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        alert("Could not copy link. Please try again.");
      });
  }
  
  
  buildURL() {
    const baseUrl = globalThis.location.origin;
    const params = new URLSearchParams({
      team: this.teamName,
      players: this.playerAmount,
      iceCost: this.iceCost,
      hours: this.hours,
      coaches: this.coachAmount
    });
  
    this.shareURL = `${baseUrl}?${params.toString()}`;
  }
  
  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(globalThis.location.search);
  
    // Check and apply URL parameters if they exist
    if (params.has("team")) this.teamName = params.get("team");
    if (params.has("players")) this.playerAmount = Number(params.get("players"));
    if (params.has("iceCost")) this.iceCost = Number(params.get("iceCost"));
    if (params.has("hours")) this.hours = Number(params.get("hours"));
    if (params.has("coaches")) this.coachAmount = Number(params.get("coaches"));
  }
  
  
  // This calculates all my totals. 
  // Originally, I had individual methods for every different 
  // calculation, which was really dumb. Thanks AI for the correction.
  _calculateTotals() {
    this.totalJersey = 88 * this.playerAmount;
    this.totalIce = this.iceCost * this.hours;
    this.totalCoach = 3000 * this.coachAmount;
  
    this.totalOverhead = (this.totalIce + this.totalCoach + this.totalJersey) * 0.02;

    this.totalCost = this.totalIce + this.totalCoach + this.totalJersey + this.totalOverhead;
    this.costPerPlayer = (this.totalCost / this.playerAmount);
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