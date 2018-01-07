/*
 * Copyright (C) 2018 helfrich
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Slider(min, max, element, thumb) {
    this.min = min;
    this.max = max;
    this.value = min;
    this.element = element;
    this.thumb = thumb;

    sliderInstance = this;

    shift = thumb.offsetHeight / 2;

    mouseDownCallback = function (evt) {

        var thumbYOffset = evt.clientY - thumb.offsetTop;

        mouseMoveCallback = function (evt) {
            var yRange = element.offsetHeight;
            var y = Math.max(0, Math.min(yRange, evt.clientY - thumbYOffset));
            thumb.style.top = y - shift + 'px';
            sliderInstance.value = max - y / yRange * (max - min);
            sliderInstance.onChange();
            evt.preventDefault();
        };

        mouseUpCallback = function (evt) {
            document.removeEventListener('mousemove', mouseMoveCallback, false);
            document.removeEventListener('mouseup', mouseUpCallback, false);
        };

        document.addEventListener('mousemove', mouseMoveCallback, false);
        document.addEventListener('mouseup', mouseUpCallback, false);

        evt.preventDefault();
    };

    thumb.addEventListener('mousedown', mouseDownCallback, false);
}

Slider.prototype.setValue = function (value) {
    value = Math.max(this.min, Math.min(this.max, value));
    var yRange = this.element.clientHeight;
    var y = Math.floor((this.max - value) / (this.max - this.min) * yRange);
    this.thumb.style.top = y - shift + 'px';
    this.value = value;
    this.onChange();
};

Slider.prototype.getValue = function () {
    return this.value;
};

Slider.prototype.getId = function () {
    return this.element.id;
};


function onSliderChange() {
    // We can use this.getId() to identify the slider
    document.getElementById("demo-value").innerHTML = this.getValue().toFixed(0);

}

function init() {
    slider = new Slider(0, 100, document.getElementById("demo-slider"),
            document.getElementById("demo-thumb"));
    slider.onChange = onSliderChange;
    slider.setValue(25);
}

