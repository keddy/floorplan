var floorPlan_json = {};
var floorPlan = {};
var globalSettings = {
  name: 1,
	id: 1,
  roomWidth: 50,
  roomHeight: 500,
  roomX: 50,
  roomY: 50,
  chairWidth: 50,
  chairHeight: 50,
  chairX: 20,
  chairY: 20,
}


function setName() {
	var ret = globalSettings.name;
	globalSettings.name++;
	return ret;
}

function setid() {
  var ret = globalSettings.id;
  globalSettings.id++;
  return ret;
}


class room {
  constructor(name, id, w, h, x, y, ) {
    this._name = name;
    this._id = id;
    this._w = w;
    this._h = h;
    this._x = x;
    this._y = y;
    this._chairs = {};
    this.addChair = chairs.add;
    this.getChair = chairs.get;
    this.delChair = chairs.del;
    this.name = rooms.properties.name;
    this.id = rooms.properties.id;
    this.w = rooms.properties.w;
    this.h = rooms.properties.h;
    this.x = rooms.properties.x;
    this.y = rooms.properties.y;
    this.html = rooms.html;
    this.drag = {
      containment: "parent",
      create: function() {},
      start: function() {},
      resize: function() {},
      stop: function() {
        var id = $(this).attr("room-id");
        floorPlan[id].x($(this).css("left"));
        floorPlan[id].y($(this).css("top"));
      }
    };
    this.resize = {
      autoHide: true,
      create: function() {},
      start: function() {},
      resize: function() {},
      stop: function() {
        var id = $(this).attr("room-id");
        floorPlan[id].w($(this).css("width"));
        floorPlan[id].h($(this).css("height"));
      }
    };
  }
}

class chair {
  constructor(name, id, w, h, x, y) {
    this._name = name;
    this._id = id;
    this._w = w;
    this._h = h;
    this._x = x;
    this._y = y;
    this.name = chairs.properties.name;
    this.id = chairs.properties.id;
    this.w = chairs.properties.w;
    this.h = chairs.properties.h;
    this.x = chairs.properties.x;
    this.y = chairs.properties.y;
    this.html = chairs.html;
    this.drag = {
      containment: "parent",
      snap: true,
      create: function() {},
      start: function() {},
      resize: function() {},
      stop: function() {

      }

    };
    this.resize = {
      grid: [10, 10],
      autoHide: true,
      create: function() {},
      start: function() {},
      resize: function() {},
      stop: function() {}
    };

  }
}

var rooms = {
  add: function(name = "room" + setName() + "", id = setid(), w = globalSettings.roomWidth, h = globalSettings.roomHeight, x = globalSettings.roomX, y = globalSettings.roomY) {
    floorPlan[id] = new room(name, id, w, h, x, y);
    floorPlan[id].html();
    return floorPlan[id];
  },
  get: function(id) {
    return floorPlan[id];
  },
  del: function(id) {
    delete floorPlan[id];
  },
  html: function() {
    var _html = $("<div class='room' room-id='" + this.id() + "'></div>");
    _html.css("width", this.w());
    _html.css("height", this.h());
    _html.css("left", this.x());
    _html.css("top", this.y());
    $(".main").append(_html);
    _html.draggable(this.drag);
    _html.resizable(this.resize);
    var _htmlHead = $("<div class='room-head' room-id='" + this.id() + "'>" + this.name() + "</div>");
    _htmlHead.css("width", "99%");
    $("[room-id='" + this.id() + "']").append(_htmlHead);
    _htmlHead.draggable(this.drag);
    _htmlHead.resizable(this.resize);
  },
  properties: {
    name: function(name) {
      if (name !== undefined) {
        this._name = name;
      }
      return this._name;
    },
    id: function(id) {
      if (id !== undefined) {
        this._id = id;
      }
      return this._id;
    },
    w: function(w) {
      if (w !== undefined) {
        this._w = w;
      }
      return this._w;
    },
    h: function(h) {
      if (h !== undefined) {
        this._h = h;
      }
      return this._h;
    },
    x: function(x) {
      if (x !== undefined) {
        this._x = x;
      }
      return this._x;
    },
    y: function(y) {
      if (y !== undefined) {
        this._y = y;
      }
      return this._y;
    },
    chairs: function(chairs) {
      if (chairs !== undefined) {
        this._chairs = chairs;
      }
      return this._chairs;
    },
  }
};

var chairs = {
  add: function(name = "chair" + setName() + "", id = setid(), w = globalSettings.chairWidth, h = globalSettings.chairHeight, x = globalSettings.chairX, y = globalSettings.chairY) {
    this._chairs[id] = new chair(name, id, w, h, x, y);
    this._chairs[id].html();
    //this._chairs[id].inputText;
	return this;
  },
  get: function(id) {
    return this._chairs[id];
  },
  del: function(id) {
    delete this._chairs[id];
  },
  html: function() {
    var _html = $("<div class='chair' chair-id='" + this.id() + "'>" + this.name() + "</div>");
    _html.css("width", this.w());
    _html.css("height", this.h());
    _html.css("left", this.x());
    _html.css("top", this.y())
    $(".room").append(_html);
    _html.draggable(this.drag);
    _html.resizable(this.resize);
  },
  inputText: function() {
  	
  },
  properties: {
    name: function(name) {
      if (name !== undefined) {
        this._name = name;
      }
      return this._name;
    },
    id: function(id) {
      if (id !== undefined) {
        this._id = id;
      }
      return this._id;
    },
    w: function(w) {
      if (w !== undefined) {
        this._w = w;
      }
      return this._w;
    },
    h: function(h) {
      if (h !== undefined) {
        this._h = h;
      }
      return this._h;
    },
    x: function(x) {
      if (x !== undefined) {
        this._x = x;
      }
      return this._x;
    },
    y: function(y) {
      if (y !== undefined) {
        this._y = y;
      }
      return this._y;
    },
  }
};






$(document).ready(function() {
	$(".chaircontrol").draggable();
	$(".addChairButton").on("click", function() {
	rooms.get(1).addChair();
	});
	$(".textbox").on("keyup",function() {
		$(".chair.isSelect").text($(this).val());
	});
	$(".main").on("click",".chair",function(ev) {
		var chair = $(this);
		$(".textbox").val(chair.text());
		$(".chair").removeClass("isSelect");
		chair.addClass("isSelect");
	});
		
	});

function testRun() {
  rooms.add(undefined, undefined, 500, undefined, undefined, undefined).addChair("chair1", "B", 50, 50, 50, 150).addChair("chair2", "C", 50, 50, 100, 50);

  var x = 34;
  $(".main").css("width", "600");
  $(".main").css("height", "600");

}
testRun();