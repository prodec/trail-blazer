L.Map = L.Map.extend({
  closePopup: function(popup) {
    if (!popup || popup === this._popup) {
      popup = this._popup;
      this._popup = null;
    }

    if (popup) { $(popup._container).css("display", "none") }

    return this;
  }
});
