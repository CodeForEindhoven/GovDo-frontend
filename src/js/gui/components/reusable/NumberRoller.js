var NumberRoller = function(){

	var newValue;
	var downPoint;

	return {
		view: function(vnode){
			return m("span.numberroller", {
				onmousedown: function(e){
					var currentValue = vnode.attrs.value;
					newValue = currentValue;
					downpoint = e.screenY;
					var movelistener = function(e){
						e.preventDefault();
						var delta = downpoint - e.screenY;
						newValue = currentValue + Math.round((delta/10));
						if(newValue<0){newValue = 0;}
						vnode.attrs.oninput(newValue);
					};

					var uplistener = function(e){
						document.removeEventListener("mousemove", movelistener);
						document.removeEventListener("mouseup", uplistener);

						newValue = undefined;
					};

					document.addEventListener("mousemove", movelistener);
					document.addEventListener("mouseup", uplistener);
				}
			}, (newValue!==undefined) ? newValue : vnode.attrs.value);
		}
	};
};
