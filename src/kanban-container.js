import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';

import "./status-col.js";
import "./task-card.js";

class KanbanContainer extends PolymerElement {
  static get template() {
    return html`
      <style>
        .kanban-container {
          display: grid;
          text-align: center;
          grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
          grid-column-gap: 1em;
          padding: 70px 25px 25px;
        }

        .btn2 {
          cursor: pointer;
          position: absolute;
          top: 27vh;
          left: 2vw;
          height: 3vh;
          width: 9vw;
          text-align: center;
          background: whitesmoke;
          color: #24294a;
          font-size: 1em;
          border-radius: 15px;
        }

        .btn2:hover, .btn:focus {
          background:  rgb(218, 214, 214);
        }

        .btn2:active {
          box-shadow: 0 1px 2px rgba(0,0,0, 0.5) inset;
        }

        .btn3 {
          cursor: pointer;
          position: absolute;
          top: 27vh;
          left: 13vw;
          height: 3vh;
          width: 9vw;
          text-align: center;
          background: whitesmoke;
          color: #24294a;
          font-size: .80em;
          border-radius: 15px;
        }

        .btn3:hover, .btn:focus {
          background:  rgb(218, 214, 214);
        }

        .btn3:active {
          box-shadow: 0 1px 2px rgba(0,0,0, 0.5) inset;
        }
        
      </style>
      <div class="kanban-container">
        <status-col heading="Backlog">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isBacklog" sort="[[sortType]]">
          <task-card
            id="[[item.id]]"
            user="[[item.assignedname__c]]"
            title="[[item.title__c]]"
            date="[[item.duedate__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="In Progress">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isInProgress" sort="[[sortType]]">
          <task-card
            id="[[item.id]]"
            user="[[item.assignedname__c]]"
            title="[[item.title__c]]"
            date="[[item.duedate__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>

        <status-col heading="Complete">
          <template is="dom-repeat" items="{{tasks}}" observe="status" filter="isComplete" sort="[[sortType]]">
          <task-card
            id="[[item.id]]"
            user="[[item.assignedname__c]]"
            title="[[item.title__c]]"
            date="[[item.duedate__c]]"
            color="[[item.color__c]]"
          >
              <p>[[item.taskdescription__c]]</p>
            </task-card>
          </template>
        </status-col>
        <button class='btn2' on-click="dateSort">Sort By Date</button>
        <button class='btn3' on-click="titleSort">Sort By Title</button>
      </div>
    `;
  }

  static get properties() {
    return {
      tasks: Array,
      sortType: String
    }
  }

  isBacklog(item) {
    return item.status__c === "Backlog";
  }

  isInProgress(item) {
    return item.status__c === "In Progress";
  }

  isComplete(item) {
    return item.status__c === "Complete";
  }


  titleSort(a, b) {
    this.sortType = "titleSort";
    console.log("test sort by title");
    var nameA = a.title__c.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title__c.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  dateSort(a, b) {
    this.sortType = "dateSort";
    console.log("test sort by date")
    var dateA = a.duedate__c.toUpperCase(); // ignore upper and lowercase
    var dateB = b.duedate__c.toUpperCase(); // ignore upper and lowercase
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }

    // names must be equal
    return 0;
  }



  constructor() {
    super();
    this.sortType = "titleSort"
  }
}

customElements.define("kanban-container", KanbanContainer);
