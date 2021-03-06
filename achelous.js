/**
 * Created by phoehne on 3/28/14.
 */
"use strict";

var _ = require('lodash');


module.exports = function(p1, properties) {
  var Entity = function() {
    if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
      this.rel = [arguments[0]];
      this.href = arguments[1];
    } else if(arguments.length === 1 && _.isObject(arguments[0])) {
      if (arguments[0].class) { this.class = arguments[0].class; }
      if (arguments[0].rel) { this.rel = arguments[0].rel; }
      if (arguments[0].properties) { this.properties = arguments[0].properties; }
      if (arguments[0].href) { this.href = arguments[0].href; }
      if (arguments[0].links)  { this.links = arguments[0].links; }
    }

    Object.defineProperty(this, "addLink", {
      enumerable: false,
      value: function(rel, href) {
        if (!this.links) {
          this.links = [];
        }
        if (arguments.length >= 2) {
          var newLink = new Link(arguments[0], arguments[1]);
          if (arguments.length === 3) {
            newLink.title = arguments[2];
          }
          this.links.push(newLink);
        } else if (arguments.length === 1) {
          this.links.push(new Link(arguments[0]));
        }
        return this;
      }
    });

    Object.defineProperty(this, "addEntity", {
      enumerable: false,
      value: function() {
        if(!this.entities) { this.entities = []; }
        if (arguments.length === 2 && _.isString(arguments[0]) &&_.isString(arguments[1])) {
          this.entities.push(new Entity(arguments[0], arguments[1]));
        } else if(arguments.length === 1 && _.isObject(arguments[0])) {
          this.entities.push(new Entity(arguments[0]));
        }
        return this;
      }
    });

    Object.defineProperty(this, 'addAction', {
      enumerable: false,
      value: function() {
        if (!this.actions) { this.actions = []; }
        if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
          this.actions.push(new Action(arguments[0], arguments[1]));
        } else if(arguments.length === 1 && _.isObject(arguments[0])) {
          this.actions.push(new Action(arguments[0]));
        }
        return this;
      }
    });
  };


  var Action = function() {
    if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
      this.name = arguments[0];
      this.href = arguments[1];
    } else if(arguments.length === 1 && _.isObject(arguments[0])) {
      if (arguments[0].name) this.name = arguments[0].name;
      if (arguments[0].title) this.title = arguments[0].title;
      if (arguments[0].method) this.method = arguments[0].method;
      if (arguments[0].href) this.href = arguments[0].href;
      if (arguments[0].type) this.type = arguments[0].type;
      else this.type = "application/x-www-form-urlencoded";
      if (arguments[0].fields) this.fields = arguments[0].fields;
    }

    Object.defineProperty(this, "addField", {
      enumerable: false,
      value: function() {
        if (!this.fields) { this.fields = []; }

        var newField = {}
        if (arguments.length >= 1) { newField.name = arguments[0]; };
        if (arguments.length >= 2) { newField.type = arguments[1]; }
        else { newField.type = "text" }
        if (arguments.length >= 3) { newField.value = arguments[2].toString() }
        if (arguments.length === 4) { newField.title = arguments[3]; }

        this.fields.push(newField);
        return this;
      }
    });
  };

  var Link = function() {
    if (arguments.length >= 2) {
      if (_.isString(arguments[0])) {
        this.rel = [arguments[0]];
        this.href = arguments[1];
      } else if(_.isArray(arguments[0])) {
        this.rel = arguments[0];
        this.href = arguments[1];
      }
      if (arguments.length === 3) {
        this.title = arguments[2];
      }
    } else if(_.isObject(arguments[0])) {
      if (arguments[0].rel) this.rel = arguments[0].rel;
      if (arguments[0].href) this.href = arguments[0].href;
      if (arguments[0].title) this.title = arguments[0].title;
    }
  };

  if (_.isString(p1)) {
    this.class = [p1];
  } else if(_.isArray(p1)) {
    this.class = p1;
  }

  if(properties && _.isObject(properties)) {
    this.properties = properties;
  }

  Object.defineProperty(this, "addEntity", {
    enumerable: false,
    value: function() {
      if(!this.entities) { this.entities = []; }
      if (arguments.length === 2 && _.isString(arguments[0]) &&_.isString(arguments[1])) {
        this.entities.push(new Entity(arguments[0], arguments[1]));
      } else if(arguments.length === 1 && _.isObject(arguments[0])) {
        this.entities.push(new Entity(arguments[0]));
      }
      return this;
    }
  });

  Object.defineProperty(this, "makeEntity", {
    enumerable: false,
    value: function() {
      if(!this.entities) { this.entities = []; }
      var newEntity;
      if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
        newEntity = new Entity(arguments[0], arguments[1]);
      } else if(arguments.length === 1 && _.isObject(arguments[0])) {
        newEntity = new Entity(arguments[0])
      }
      this.entities.push(newEntity);
      console.log(newEntity);
      return newEntity;
    }
  })

  Object.defineProperty(this, "addAction", {
    enumerable: false,
    value: function() {
      if (!this.actions) { this.actions = []; }
      if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
        this.actions.push(new Action(arguments[0], arguments[1]));
      } else if(arguments.length === 1 && _.isObject(arguments[0])) {
        this.actions.push(new Action(arguments[0]));
      }
      return this;
    }
  });

  Object.defineProperty(this, "makeAction", {
    enumerable: false,
    value: function() {
      if (!this.actions) { this.actions = []; }
      var newAction;
      if (arguments.length === 2 && _.isString(arguments[0]) && _.isString(arguments[1])) {
        newAction = new Action(arguments[0], arguments[1]);
      } else if(arguments.length === 1 && _.isObject(arguments[0])) {
        newAction = new Action(arguments[0]);
      }
      this.actions.push(newAction);
      return newAction;
    }
  });

  Object.defineProperty(this, "addLink", {
    enumerable: false,
    value: function() {
      if (!this.links) {
        this.links = [];
      }
      if (arguments.length >= 2) {
        var newLink = new Link(arguments[0], arguments[1]);
        if (arguments.length === 3) {
          newLink.title = arguments[2];
        }
        this.links.push(newLink);
      } else if (arguments.length === 1) {
        this.links.push(new Link(arguments[0]));
      }
      return this;
    }
  });

};
