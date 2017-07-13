var wm1 = new Map();

module.exports = {
    setMap: function(key, value){
        return wm1.set(key, value);
    },
    getMap: function(key){
        return wm1.get(key);
    },
    hasMap: function(key){
        return wm1.has(key);
    },
    deleteMap: function(key){
        return wm1.delete(key);
    },

};

