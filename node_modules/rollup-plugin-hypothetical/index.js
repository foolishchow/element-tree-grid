var path = require('path').posix;

function isAbsolute(p) {
  return path.isAbsolute(p) || /^[A-Za-z]:\//.test(p);
}

function absolutify(p, cwd) {
  if(cwd) {
    return path.join(cwd, p);
  } else {
    return './' + p;
  }
}

module.exports = function rollupPluginHypothetical(options) {
  options = options || {};
  var files0 = options.files || {};
  var allowRealFiles = options.allowRealFiles || false;
  var allowExternalModules = options.allowExternalModules;
  if(allowExternalModules === undefined) {
    allowExternalModules = true;
  }
  var leaveIdsAlone = options.leaveIdsAlone || false;
  var impliedExtensions = options.impliedExtensions;
  if(impliedExtensions === undefined) {
    impliedExtensions = ['.js'];
  } else {
    impliedExtensions = Array.prototype.slice.call(impliedExtensions);
  }
  var cwd = options.cwd;
  if(cwd !== false) {
    if(cwd === undefined) {
      cwd = process.cwd();
    }
    cwd = unixStylePath(cwd);
  }
  
  var files = {};
  if(leaveIdsAlone) {
    for(var f in files0) {
      files[f] = files0[f];
    }
  } else {
    for(var f in files0) {
      var p = path.normalize(unixStylePath(f));
      if(!isAbsolute(p)) {
        p = absolutify(p, cwd);
      }
      files[p] = files0[f];
    }
  }
  
  function basicResolve(importee) {
    if(importee in files) {
      return importee;
    } else if(!allowRealFiles) {
      throw dneError(importee);
    }
  }

  var resolveId = leaveIdsAlone ? basicResolve : function(importee, importer) {
    importee = unixStylePath(importee);
    if(importer && !/^(\.?\.?|[A-Za-z]:)\//.test(importee)) {
      if(allowExternalModules) {
        return;
      } else {
        throw Error("External module \""+importee+"\" is not allowed!");
      }
    }
    if(!isAbsolute(importee) && importer) {
      importee = path.join(path.dirname(importer), importee);
    } else {
      importee = path.normalize(importee);
    }
    if(!isAbsolute(importee)) {
      importee = absolutify(importee, cwd);
    }

    if(importee in files) {
      return importee;
    } else if(impliedExtensions) {
      for(var i = 0, len = impliedExtensions.length; i < len; ++i) {
        var extended = importee + impliedExtensions[i];
        if(extended in files) {
          return extended;
        }
      }
    }
    if(!allowRealFiles) {
      throw dneError(importee);
    }
  };
  
  return {
    resolveId: resolveId,
    load: function(id) {
      if(id in files) {
        return files[id];
      } else {
        id = resolveId(id);
        return id && files[id];
      }
    }
  };
}

function unixStylePath(p) {
  return p.split('\\').join('/');
}

function dneError(id) {
  return Error("\""+id+"\" does not exist in the hypothetical file system!");
}
