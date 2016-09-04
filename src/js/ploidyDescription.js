/**
 * Ploidy description class.
 * @public
 * @class
 */
function PloidyDescription(description) {
    /**
     * @private
     * @member {Object[]}
     */
    this._description = this._normilize(description);
}


/**
 * Normalize use defined description.
 * @private
 * @param {Mixed[]}
 * @returns {Object[]}
 */
PloidyDescription.prototype._normilize = function(description) {
    /*
     * Return the same if no description provided.
     */
    if (! description) {
        return description;
    }
    /*
     * Array of normalized description objects.
     */
    var normalized = [];
    /*
     * Loop through description and normalize.
     */
    for (var key in description) {
        if (typeof description[key] == 'string') {
            normalized.push({
                ancestors : description[key],
                existance : new Array(description[key].length).fill('11')
            });
        } else {
            normalized.push({
                ancestors : Object.keys(description[key])[0],
                existance : description[key][Object.keys(description[key])[0]]
            });
        }
    }

    return normalized;
};


/**
 * Get ancestor letter.
 * @param {Integer} chrSetNumber
 * @param {Integer} chrNumber
 * @param {Integer} armNumber
 * @returns {String}
 */
PloidyDescription.prototype.getAncestor = function(chrSetNumber, chrNumber, armNumber) {

    return this._description[chrSetNumber].ancestors[chrNumber];
}


/**
 * Check chromosome's arm should be rendered.
 * If no description was provided method will always returns true and
 * something another depending on user provided description.
 * @param chrSetNumber
 * @param chrNumber
 * @param armNumber
 * @returns {Boolean}
 */
PloidyDescription.prototype.isExists = function(chrSetNumber, chrNumber, armNumber) {

    if (this._description) {
        return Number(this._description[chrSetNumber].existance[chrNumber][armNumber]) > 0;
    } else {
        return true;
    }
};