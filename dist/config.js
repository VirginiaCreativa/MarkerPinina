/******/ (function(modules) {
  // webpackBootstrap
  /******/ function hotDisposeChunk(chunkId) {
    /******/ delete installedChunks[chunkId];
    /******/
  }
  /******/ var parentHotUpdateCallback = window['webpackHotUpdate'];
  /******/ window[
    'webpackHotUpdate'
  ] = /******/ function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-next-line no-unused-vars
    /******/ hotAddUpdateChunk(chunkId, moreModules);
    /******/ if (parentHotUpdateCallback)
      parentHotUpdateCallback(chunkId, moreModules);
    /******/
  }; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadUpdateChunk(chunkId) {
    /******/ var head = document.getElementsByTagName('head')[0];
    /******/ var script = document.createElement('script');
    /******/ script.charset = 'utf-8';
    /******/ script.src =
      __webpack_require__.p +
      '' +
      chunkId +
      '.' +
      hotCurrentHash +
      '.hot-update.js';
    /******/ if (null) script.crossOrigin = null;
    /******/ head.appendChild(script);
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadManifest(requestTimeout) {
    /******/ requestTimeout = requestTimeout || 10000;
    /******/ return new Promise(function(resolve, reject) {
      /******/ if (typeof XMLHttpRequest === 'undefined') {
        /******/ return reject(new Error('No browser support'));
        /******/
      }
      /******/ try {
        /******/ var request = new XMLHttpRequest();
        /******/ var requestPath =
          __webpack_require__.p + '' + hotCurrentHash + '.hot-update.json';
        /******/ request.open('GET', requestPath, true);
        /******/ request.timeout = requestTimeout;
        /******/ request.send(null);
        /******/
      } catch (err) {
        /******/ return reject(err);
        /******/
      }
      /******/ request.onreadystatechange = function() {
        /******/ if (request.readyState !== 4) return;
        /******/ if (request.status === 0) {
          /******/ // timeout
          /******/ reject(
            /******/ new Error(
              'Manifest request to ' + requestPath + ' timed out.',
            ),
            /******/
          );
          /******/
        } else if (request.status === 404) {
          /******/ // no update available
          /******/ resolve();
          /******/
        } else if (request.status !== 200 && request.status !== 304) {
          /******/ // other failure
          /******/ reject(
            new Error('Manifest request to ' + requestPath + ' failed.'),
          );
          /******/
        } else {
          /******/ // success
          /******/ try {
            /******/ var update = JSON.parse(request.responseText);
            /******/
          } catch (e) {
            /******/ reject(e);
            /******/ return;
            /******/
          }
          /******/ resolve(update);
          /******/
        }
        /******/
      };
      /******/
    });
    /******/
  }
  /******/
  /******/ var hotApplyOnUpdate = true; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentHash = 'e7a6e7f4e6cbb53f2a79';
  /******/ var hotRequestTimeout = 10000;
  /******/ var hotCurrentModuleData = {};
  /******/ var hotCurrentChildModule; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParents = []; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParentsTemp = []; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateRequire(moduleId) {
    /******/ var me = installedModules[moduleId];
    /******/ if (!me) return __webpack_require__;
    /******/ var fn = function(request) {
      /******/ if (me.hot.active) {
        /******/ if (installedModules[request]) {
          /******/ if (
            installedModules[request].parents.indexOf(moduleId) === -1
          ) {
            /******/ installedModules[request].parents.push(moduleId);
            /******/
          }
          /******/
        } else {
          /******/ hotCurrentParents = [moduleId];
          /******/ hotCurrentChildModule = request;
          /******/
        }
        /******/ if (me.children.indexOf(request) === -1) {
          /******/ me.children.push(request);
          /******/
        }
        /******/
      } else {
        /******/ console.warn(
          /******/ '[HMR] unexpected require(' +
            /******/ request +
            /******/ ') from disposed module ' +
            /******/ moduleId,
          /******/
        );
        /******/ hotCurrentParents = [];
        /******/
      }
      /******/ return __webpack_require__(request);
      /******/
    };
    /******/ var ObjectFactory = function ObjectFactory(name) {
      /******/ return {
        /******/ configurable: true,
        /******/ enumerable: true,
        /******/ get: function() {
          /******/ return __webpack_require__[name];
          /******/
        },
        /******/ set: function(value) {
          /******/ __webpack_require__[name] = value;
          /******/
        },
        /******/
      };
      /******/
    };
    /******/ for (var name in __webpack_require__) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          __webpack_require__,
          name,
        ) &&
        /******/ name !== 'e' &&
        /******/ name !== 't'
        /******/
      ) {
        /******/ Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
      }
      /******/
    }
    /******/ fn.e = function(chunkId) {
      /******/ if (hotStatus === 'ready') hotSetStatus('prepare');
      /******/ hotChunksLoading++;
      /******/ return __webpack_require__
        .e(chunkId)
        .then(finishChunkLoading, function(err) {
          /******/ finishChunkLoading();
          /******/ throw err;
          /******/
        });
      /******/
      /******/ function finishChunkLoading() {
        /******/ hotChunksLoading--;
        /******/ if (hotStatus === 'prepare') {
          /******/ if (!hotWaitingFilesMap[chunkId]) {
            /******/ hotEnsureUpdateChunk(chunkId);
            /******/
          }
          /******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ hotUpdateDownloaded();
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/ fn.t = function(value, mode) {
      /******/ if (mode & 1) value = fn(value);
      /******/ return __webpack_require__.t(value, mode & ~1);
      /******/
    };
    /******/ return fn;
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateModule(moduleId) {
    /******/ var hot = {
      /******/ // private stuff
      /******/ _acceptedDependencies: {},
      /******/ _declinedDependencies: {},
      /******/ _selfAccepted: false,
      /******/ _selfDeclined: false,
      /******/ _disposeHandlers: [],
      /******/ _main: hotCurrentChildModule !== moduleId, // Module API
      /******/
      /******/ /******/ active: true,
      /******/ accept: function(dep, callback) {
        /******/ if (dep === undefined) hot._selfAccepted = true;
        /******/ else if (typeof dep === 'function') hot._selfAccepted = dep;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._acceptedDependencies[dep[i]] =
              callback || function() {};
        /******/ else
          hot._acceptedDependencies[dep] = callback || function() {};
        /******/
      },
      /******/ decline: function(dep) {
        /******/ if (dep === undefined) hot._selfDeclined = true;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._declinedDependencies[dep[i]] = true;
        /******/ else hot._declinedDependencies[dep] = true;
        /******/
      },
      /******/ dispose: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ addDisposeHandler: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ removeDisposeHandler: function(callback) {
        /******/ var idx = hot._disposeHandlers.indexOf(callback);
        /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/
      }, // Management API
      /******/
      /******/ /******/ check: hotCheck,
      /******/ apply: hotApply,
      /******/ status: function(l) {
        /******/ if (!l) return hotStatus;
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ addStatusHandler: function(l) {
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ removeStatusHandler: function(l) {
        /******/ var idx = hotStatusHandlers.indexOf(l);
        /******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/
      }, //inherit from previous dispose call
      /******/
      /******/ /******/ data: hotCurrentModuleData[moduleId],
      /******/
    };
    /******/ hotCurrentChildModule = undefined;
    /******/ return hot;
    /******/
  }
  /******/
  /******/ var hotStatusHandlers = [];
  /******/ var hotStatus = 'idle';
  /******/
  /******/ function hotSetStatus(newStatus) {
    /******/ hotStatus = newStatus;
    /******/ for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ hotStatusHandlers[i].call(null, newStatus);
    /******/
  } // while downloading
  /******/
  /******/ /******/ var hotWaitingFiles = 0;
  /******/ var hotChunksLoading = 0;
  /******/ var hotWaitingFilesMap = {};
  /******/ var hotRequestedFilesMap = {};
  /******/ var hotAvailableFilesMap = {};
  /******/ var hotDeferred; // The update info
  /******/
  /******/ /******/ var hotUpdate, hotUpdateNewHash;
  /******/
  /******/ function toModuleId(id) {
    /******/ var isNumber = +id + '' === id;
    /******/ return isNumber ? +id : id;
    /******/
  }
  /******/
  /******/ function hotCheck(apply) {
    /******/ if (hotStatus !== 'idle') {
      /******/ throw new Error('check() is only allowed in idle status');
      /******/
    }
    /******/ hotApplyOnUpdate = apply;
    /******/ hotSetStatus('check');
    /******/ return hotDownloadManifest(hotRequestTimeout).then(function(
      update,
    ) {
      /******/ if (!update) {
        /******/ hotSetStatus('idle');
        /******/ return null;
        /******/
      }
      /******/ hotRequestedFilesMap = {};
      /******/ hotWaitingFilesMap = {};
      /******/ hotAvailableFilesMap = update.c;
      /******/ hotUpdateNewHash = update.h;
      /******/
      /******/ hotSetStatus('prepare');
      /******/ var promise = new Promise(function(resolve, reject) {
        /******/ hotDeferred = {
          /******/ resolve: resolve,
          /******/ reject: reject,
          /******/
        };
        /******/
      });
      /******/ hotUpdate = {};
      /******/ var chunkId = 'config'; // eslint-disable-next-line no-lone-blocks
      /******/ /******/ {
        /******/ /*globals chunkId */
        /******/ hotEnsureUpdateChunk(chunkId);
        /******/
      }
      /******/ if (
        /******/ hotStatus === 'prepare' &&
        /******/ hotChunksLoading === 0 &&
        /******/ hotWaitingFiles === 0
        /******/
      ) {
        /******/ hotUpdateDownloaded();
        /******/
      }
      /******/ return promise;
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotAddUpdateChunk(chunkId, moreModules) {
    /******/ if (
      !hotAvailableFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    )
      /******/ return;
    /******/ hotRequestedFilesMap[chunkId] = false;
    /******/ for (var moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ hotUpdate[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ hotUpdateDownloaded();
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotEnsureUpdateChunk(chunkId) {
    /******/ if (!hotAvailableFilesMap[chunkId]) {
      /******/ hotWaitingFilesMap[chunkId] = true;
      /******/
    } else {
      /******/ hotRequestedFilesMap[chunkId] = true;
      /******/ hotWaitingFiles++;
      /******/ hotDownloadUpdateChunk(chunkId);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotUpdateDownloaded() {
    /******/ hotSetStatus('ready');
    /******/ var deferred = hotDeferred;
    /******/ hotDeferred = null;
    /******/ if (!deferred) return;
    /******/ if (hotApplyOnUpdate) {
      /******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ // avoid triggering uncaught exception warning in Chrome.
      /******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ Promise.resolve()
        /******/ .then(function() {
          /******/ return hotApply(hotApplyOnUpdate);
          /******/
        })
        /******/ .then(
          /******/ function(result) {
            /******/ deferred.resolve(result);
            /******/
          },
          /******/ function(err) {
            /******/ deferred.reject(err);
            /******/
          },
          /******/
        );
      /******/
    } else {
      /******/ var outdatedModules = [];
      /******/ for (var id in hotUpdate) {
        /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ outdatedModules.push(toModuleId(id));
          /******/
        }
        /******/
      }
      /******/ deferred.resolve(outdatedModules);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotApply(options) {
    /******/ if (hotStatus !== 'ready')
      /******/ throw new Error('apply() is only allowed in ready status');
    /******/ options = options || {};
    /******/
    /******/ var cb;
    /******/ var i;
    /******/ var j;
    /******/ var module;
    /******/ var moduleId;
    /******/
    /******/ function getAffectedStuff(updateModuleId) {
      /******/ var outdatedModules = [updateModuleId];
      /******/ var outdatedDependencies = {};
      /******/
      /******/ var queue = outdatedModules.slice().map(function(id) {
        /******/ return {
          /******/ chain: [id],
          /******/ id: id,
          /******/
        };
        /******/
      });
      /******/ while (queue.length > 0) {
        /******/ var queueItem = queue.pop();
        /******/ var moduleId = queueItem.id;
        /******/ var chain = queueItem.chain;
        /******/ module = installedModules[moduleId];
        /******/ if (!module || module.hot._selfAccepted) continue;
        /******/ if (module.hot._selfDeclined) {
          /******/ return {
            /******/ type: 'self-declined',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ if (module.hot._main) {
          /******/ return {
            /******/ type: 'unaccepted',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ for (var i = 0; i < module.parents.length; i++) {
          /******/ var parentId = module.parents[i];
          /******/ var parent = installedModules[parentId];
          /******/ if (!parent) continue;
          /******/ if (parent.hot._declinedDependencies[moduleId]) {
            /******/ return {
              /******/ type: 'declined',
              /******/ chain: chain.concat([parentId]),
              /******/ moduleId: moduleId,
              /******/ parentId: parentId,
              /******/
            };
            /******/
          }
          /******/ if (outdatedModules.indexOf(parentId) !== -1) continue;
          /******/ if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ if (!outdatedDependencies[parentId])
              /******/ outdatedDependencies[parentId] = [];
            /******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ continue;
            /******/
          }
          /******/ delete outdatedDependencies[parentId];
          /******/ outdatedModules.push(parentId);
          /******/ queue.push({
            /******/ chain: chain.concat([parentId]),
            /******/ id: parentId,
            /******/
          });
          /******/
        }
        /******/
      }
      /******/
      /******/ return {
        /******/ type: 'accepted',
        /******/ moduleId: updateModuleId,
        /******/ outdatedModules: outdatedModules,
        /******/ outdatedDependencies: outdatedDependencies,
        /******/
      };
      /******/
    }
    /******/
    /******/ function addAllToSet(a, b) {
      /******/ for (var i = 0; i < b.length; i++) {
        /******/ var item = b[i];
        /******/ if (a.indexOf(item) === -1) a.push(item);
        /******/
      }
      /******/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /******/
    /******/ /******/ /******/ var outdatedDependencies = {};
    /******/ var outdatedModules = [];
    /******/ var appliedUpdate = {};
    /******/
    /******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ console.warn(
        /******/ '[HMR] unexpected require(' +
          result.moduleId +
          ') to disposed module',
        /******/
      );
      /******/
    };
    /******/
    /******/ for (var id in hotUpdate) {
      /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ moduleId = toModuleId(id); /** @type {TODO} */
        /******/ /******/ var result;
        /******/ if (hotUpdate[id]) {
          /******/ result = getAffectedStuff(moduleId);
          /******/
        } else {
          /******/ result = {
            /******/ type: 'disposed',
            /******/ moduleId: id,
            /******/
          };
          /******/
        } /** @type {Error|false} */
        /******/ /******/ var abortError = false;
        /******/ var doApply = false;
        /******/ var doDispose = false;
        /******/ var chainInfo = '';
        /******/ if (result.chain) {
          /******/ chainInfo =
            '\nUpdate propagation: ' + result.chain.join(' -> ');
          /******/
        }
        /******/ switch (result.type) {
          /******/ case 'self-declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of self decline: ' +
                  /******/ result.moduleId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of declined dependency: ' +
                  /******/ result.moduleId +
                  /******/ ' in ' +
                  /******/ result.parentId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'unaccepted':
            /******/ if (options.onUnaccepted) options.onUnaccepted(result);
            /******/ if (!options.ignoreUnaccepted)
              /******/ abortError = new Error(
                /******/ 'Aborted because ' +
                  moduleId +
                  ' is not accepted' +
                  chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'accepted':
            /******/ if (options.onAccepted) options.onAccepted(result);
            /******/ doApply = true;
            /******/ break;
          /******/ case 'disposed':
            /******/ if (options.onDisposed) options.onDisposed(result);
            /******/ doDispose = true;
            /******/ break;
          /******/ default:
            /******/ throw new Error('Unexception type ' + result.type);
          /******/
        }
        /******/ if (abortError) {
          /******/ hotSetStatus('abort');
          /******/ return Promise.reject(abortError);
          /******/
        }
        /******/ if (doApply) {
          /******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ addAllToSet(outdatedModules, result.outdatedModules);
          /******/ for (moduleId in result.outdatedDependencies) {
            /******/ if (
              /******/ Object.prototype.hasOwnProperty.call(
                /******/ result.outdatedDependencies,
                /******/ moduleId,
                /******/
              )
              /******/
            ) {
              /******/ if (!outdatedDependencies[moduleId])
                /******/ outdatedDependencies[moduleId] = [];
              /******/ addAllToSet(
                /******/ outdatedDependencies[moduleId],
                /******/ result.outdatedDependencies[moduleId],
                /******/
              );
              /******/
            }
            /******/
          }
          /******/
        }
        /******/ if (doDispose) {
          /******/ addAllToSet(outdatedModules, [result.moduleId]);
          /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/
        }
        /******/
      }
      /******/
    } // Store self accepted outdated modules to require them later by the module system
    /******/
    /******/ /******/ var outdatedSelfAcceptedModules = [];
    /******/ for (i = 0; i < outdatedModules.length; i++) {
      /******/ moduleId = outdatedModules[i];
      /******/ if (
        /******/ installedModules[moduleId] &&
        /******/ installedModules[moduleId].hot._selfAccepted
        /******/
      )
        /******/ outdatedSelfAcceptedModules.push({
          /******/ module: moduleId,
          /******/ errorHandler: installedModules[moduleId].hot._selfAccepted,
          /******/
        });
      /******/
    } // Now in "dispose" phase
    /******/
    /******/ /******/ hotSetStatus('dispose');
    /******/ Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /******/ if (hotAvailableFilesMap[chunkId] === false) {
        /******/ hotDisposeChunk(chunkId);
        /******/
      }
      /******/
    });
    /******/
    /******/ var idx;
    /******/ var queue = outdatedModules.slice();
    /******/ while (queue.length > 0) {
      /******/ moduleId = queue.pop();
      /******/ module = installedModules[moduleId];
      /******/ if (!module) continue;
      /******/
      /******/ var data = {}; // Call dispose handlers
      /******/
      /******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
      /******/ for (j = 0; j < disposeHandlers.length; j++) {
        /******/ cb = disposeHandlers[j];
        /******/ cb(data);
        /******/
      }
      /******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /******/
      /******/ /******/ module.hot.active = false; // remove module from cache
      /******/
      /******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
      /******/
      /******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
      /******/
      /******/ /******/ for (j = 0; j < module.children.length; j++) {
        /******/ var child = installedModules[module.children[j]];
        /******/ if (!child) continue;
        /******/ idx = child.parents.indexOf(moduleId);
        /******/ if (idx >= 0) {
          /******/ child.parents.splice(idx, 1);
          /******/
        }
        /******/
      }
      /******/
    } // remove outdated dependency from module children
    /******/
    /******/ /******/ var dependency;
    /******/ var moduleOutdatedDependencies;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ dependency = moduleOutdatedDependencies[j];
            /******/ idx = module.children.indexOf(dependency);
            /******/ if (idx >= 0) module.children.splice(idx, 1);
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Not in "apply" phase
    /******/
    /******/ /******/ hotSetStatus('apply');
    /******/
    /******/ hotCurrentHash = hotUpdateNewHash; // insert new code
    /******/
    /******/ /******/ for (moduleId in appliedUpdate) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /******/ modules[moduleId] = appliedUpdate[moduleId];
        /******/
      }
      /******/
    } // call accept handlers
    /******/
    /******/ /******/ var error = null;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ var callbacks = [];
          /******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ dependency = moduleOutdatedDependencies[i];
            /******/ cb = module.hot._acceptedDependencies[dependency];
            /******/ if (cb) {
              /******/ if (callbacks.indexOf(cb) !== -1) continue;
              /******/ callbacks.push(cb);
              /******/
            }
            /******/
          }
          /******/ for (i = 0; i < callbacks.length; i++) {
            /******/ cb = callbacks[i];
            /******/ try {
              /******/ cb(moduleOutdatedDependencies);
              /******/
            } catch (err) {
              /******/ if (options.onErrored) {
                /******/ options.onErrored({
                  /******/ type: 'accept-errored',
                  /******/ moduleId: moduleId,
                  /******/ dependencyId: moduleOutdatedDependencies[i],
                  /******/ error: err,
                  /******/
                });
                /******/
              }
              /******/ if (!options.ignoreErrored) {
                /******/ if (!error) error = err;
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Load self accepted modules
    /******/
    /******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ var item = outdatedSelfAcceptedModules[i];
      /******/ moduleId = item.module;
      /******/ hotCurrentParents = [moduleId];
      /******/ try {
        /******/ __webpack_require__(moduleId);
        /******/
      } catch (err) {
        /******/ if (typeof item.errorHandler === 'function') {
          /******/ try {
            /******/ item.errorHandler(err);
            /******/
          } catch (err2) {
            /******/ if (options.onErrored) {
              /******/ options.onErrored({
                /******/ type: 'self-accept-error-handler-errored',
                /******/ moduleId: moduleId,
                /******/ error: err2,
                /******/ originalError: err,
                /******/
              });
              /******/
            }
            /******/ if (!options.ignoreErrored) {
              /******/ if (!error) error = err2;
              /******/
            }
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        } else {
          /******/ if (options.onErrored) {
            /******/ options.onErrored({
              /******/ type: 'self-accept-errored',
              /******/ moduleId: moduleId,
              /******/ error: err,
              /******/
            });
            /******/
          }
          /******/ if (!options.ignoreErrored) {
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // handle errors in accept handlers and self accepted module load
    /******/
    /******/ /******/ if (error) {
      /******/ hotSetStatus('fail');
      /******/ return Promise.reject(error);
      /******/
    }
    /******/
    /******/ hotSetStatus('idle');
    /******/ return new Promise(function(resolve) {
      /******/ resolve(outdatedModules);
      /******/
    });
    /******/
  }
  /******/ function hotDisposeChunk(chunkId) {
    /******/ delete installedChunks[chunkId];
    /******/
  }
  /******/ var parentHotUpdateCallback = window['webpackHotUpdate'];
  /******/ window[
    'webpackHotUpdate'
  ] = /******/ function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-next-line no-unused-vars
    /******/ hotAddUpdateChunk(chunkId, moreModules);
    /******/ if (parentHotUpdateCallback)
      parentHotUpdateCallback(chunkId, moreModules);
    /******/
  }; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadUpdateChunk(chunkId) {
    /******/ var head = document.getElementsByTagName('head')[0];
    /******/ var script = document.createElement('script');
    /******/ script.charset = 'utf-8';
    /******/ script.src =
      __webpack_require__.p +
      '' +
      chunkId +
      '.' +
      hotCurrentHash +
      '.hot-update.js';
    /******/ if (null) script.crossOrigin = null;
    /******/ head.appendChild(script);
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotDownloadManifest(requestTimeout) {
    /******/ requestTimeout = requestTimeout || 10000;
    /******/ return new Promise(function(resolve, reject) {
      /******/ if (typeof XMLHttpRequest === 'undefined') {
        /******/ return reject(new Error('No browser support'));
        /******/
      }
      /******/ try {
        /******/ var request = new XMLHttpRequest();
        /******/ var requestPath =
          __webpack_require__.p + '' + hotCurrentHash + '.hot-update.json';
        /******/ request.open('GET', requestPath, true);
        /******/ request.timeout = requestTimeout;
        /******/ request.send(null);
        /******/
      } catch (err) {
        /******/ return reject(err);
        /******/
      }
      /******/ request.onreadystatechange = function() {
        /******/ if (request.readyState !== 4) return;
        /******/ if (request.status === 0) {
          /******/ // timeout
          /******/ reject(
            /******/ new Error(
              'Manifest request to ' + requestPath + ' timed out.',
            ),
            /******/
          );
          /******/
        } else if (request.status === 404) {
          /******/ // no update available
          /******/ resolve();
          /******/
        } else if (request.status !== 200 && request.status !== 304) {
          /******/ // other failure
          /******/ reject(
            new Error('Manifest request to ' + requestPath + ' failed.'),
          );
          /******/
        } else {
          /******/ // success
          /******/ try {
            /******/ var update = JSON.parse(request.responseText);
            /******/
          } catch (e) {
            /******/ reject(e);
            /******/ return;
            /******/
          }
          /******/ resolve(update);
          /******/
        }
        /******/
      };
      /******/
    });
    /******/
  }
  /******/
  /******/ var hotApplyOnUpdate = true; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentHash = 'e7a6e7f4e6cbb53f2a79';
  /******/ var hotRequestTimeout = 10000;
  /******/ var hotCurrentModuleData = {};
  /******/ var hotCurrentChildModule; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParents = []; // eslint-disable-next-line no-unused-vars
  /******/ /******/ var hotCurrentParentsTemp = []; // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateRequire(moduleId) {
    /******/ var me = installedModules[moduleId];
    /******/ if (!me) return __webpack_require__;
    /******/ var fn = function(request) {
      /******/ if (me.hot.active) {
        /******/ if (installedModules[request]) {
          /******/ if (
            installedModules[request].parents.indexOf(moduleId) === -1
          ) {
            /******/ installedModules[request].parents.push(moduleId);
            /******/
          }
          /******/
        } else {
          /******/ hotCurrentParents = [moduleId];
          /******/ hotCurrentChildModule = request;
          /******/
        }
        /******/ if (me.children.indexOf(request) === -1) {
          /******/ me.children.push(request);
          /******/
        }
        /******/
      } else {
        /******/ console.warn(
          /******/ '[HMR] unexpected require(' +
            /******/ request +
            /******/ ') from disposed module ' +
            /******/ moduleId,
          /******/
        );
        /******/ hotCurrentParents = [];
        /******/
      }
      /******/ return __webpack_require__(request);
      /******/
    };
    /******/ var ObjectFactory = function ObjectFactory(name) {
      /******/ return {
        /******/ configurable: true,
        /******/ enumerable: true,
        /******/ get: function() {
          /******/ return __webpack_require__[name];
          /******/
        },
        /******/ set: function(value) {
          /******/ __webpack_require__[name] = value;
          /******/
        },
        /******/
      };
      /******/
    };
    /******/ for (var name in __webpack_require__) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          __webpack_require__,
          name,
        ) &&
        /******/ name !== 'e' &&
        /******/ name !== 't'
        /******/
      ) {
        /******/ Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
      }
      /******/
    }
    /******/ fn.e = function(chunkId) {
      /******/ if (hotStatus === 'ready') hotSetStatus('prepare');
      /******/ hotChunksLoading++;
      /******/ return __webpack_require__
        .e(chunkId)
        .then(finishChunkLoading, function(err) {
          /******/ finishChunkLoading();
          /******/ throw err;
          /******/
        });
      /******/
      /******/ function finishChunkLoading() {
        /******/ hotChunksLoading--;
        /******/ if (hotStatus === 'prepare') {
          /******/ if (!hotWaitingFilesMap[chunkId]) {
            /******/ hotEnsureUpdateChunk(chunkId);
            /******/
          }
          /******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ hotUpdateDownloaded();
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/ fn.t = function(value, mode) {
      /******/ if (mode & 1) value = fn(value);
      /******/ return __webpack_require__.t(value, mode & ~1);
      /******/
    };
    /******/ return fn;
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotCreateModule(moduleId) {
    /******/ var hot = {
      /******/ // private stuff
      /******/ _acceptedDependencies: {},
      /******/ _declinedDependencies: {},
      /******/ _selfAccepted: false,
      /******/ _selfDeclined: false,
      /******/ _disposeHandlers: [],
      /******/ _main: hotCurrentChildModule !== moduleId, // Module API
      /******/
      /******/ /******/ active: true,
      /******/ accept: function(dep, callback) {
        /******/ if (dep === undefined) hot._selfAccepted = true;
        /******/ else if (typeof dep === 'function') hot._selfAccepted = dep;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._acceptedDependencies[dep[i]] =
              callback || function() {};
        /******/ else
          hot._acceptedDependencies[dep] = callback || function() {};
        /******/
      },
      /******/ decline: function(dep) {
        /******/ if (dep === undefined) hot._selfDeclined = true;
        /******/ else if (typeof dep === 'object')
          /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._declinedDependencies[dep[i]] = true;
        /******/ else hot._declinedDependencies[dep] = true;
        /******/
      },
      /******/ dispose: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ addDisposeHandler: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ removeDisposeHandler: function(callback) {
        /******/ var idx = hot._disposeHandlers.indexOf(callback);
        /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/
      }, // Management API
      /******/
      /******/ /******/ check: hotCheck,
      /******/ apply: hotApply,
      /******/ status: function(l) {
        /******/ if (!l) return hotStatus;
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ addStatusHandler: function(l) {
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ removeStatusHandler: function(l) {
        /******/ var idx = hotStatusHandlers.indexOf(l);
        /******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/
      }, //inherit from previous dispose call
      /******/
      /******/ /******/ data: hotCurrentModuleData[moduleId],
      /******/
    };
    /******/ hotCurrentChildModule = undefined;
    /******/ return hot;
    /******/
  }
  /******/
  /******/ var hotStatusHandlers = [];
  /******/ var hotStatus = 'idle';
  /******/
  /******/ function hotSetStatus(newStatus) {
    /******/ hotStatus = newStatus;
    /******/ for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ hotStatusHandlers[i].call(null, newStatus);
    /******/
  } // while downloading
  /******/
  /******/ /******/ var hotWaitingFiles = 0;
  /******/ var hotChunksLoading = 0;
  /******/ var hotWaitingFilesMap = {};
  /******/ var hotRequestedFilesMap = {};
  /******/ var hotAvailableFilesMap = {};
  /******/ var hotDeferred; // The update info
  /******/
  /******/ /******/ var hotUpdate, hotUpdateNewHash;
  /******/
  /******/ function toModuleId(id) {
    /******/ var isNumber = +id + '' === id;
    /******/ return isNumber ? +id : id;
    /******/
  }
  /******/
  /******/ function hotCheck(apply) {
    /******/ if (hotStatus !== 'idle') {
      /******/ throw new Error('check() is only allowed in idle status');
      /******/
    }
    /******/ hotApplyOnUpdate = apply;
    /******/ hotSetStatus('check');
    /******/ return hotDownloadManifest(hotRequestTimeout).then(function(
      update,
    ) {
      /******/ if (!update) {
        /******/ hotSetStatus('idle');
        /******/ return null;
        /******/
      }
      /******/ hotRequestedFilesMap = {};
      /******/ hotWaitingFilesMap = {};
      /******/ hotAvailableFilesMap = update.c;
      /******/ hotUpdateNewHash = update.h;
      /******/
      /******/ hotSetStatus('prepare');
      /******/ var promise = new Promise(function(resolve, reject) {
        /******/ hotDeferred = {
          /******/ resolve: resolve,
          /******/ reject: reject,
          /******/
        };
        /******/
      });
      /******/ hotUpdate = {};
      /******/ var chunkId = 'config'; // eslint-disable-next-line no-lone-blocks
      /******/ /******/ {
        /******/ /*globals chunkId */
        /******/ hotEnsureUpdateChunk(chunkId);
        /******/
      }
      /******/ if (
        /******/ hotStatus === 'prepare' &&
        /******/ hotChunksLoading === 0 &&
        /******/ hotWaitingFiles === 0
        /******/
      ) {
        /******/ hotUpdateDownloaded();
        /******/
      }
      /******/ return promise;
      /******/
    });
    /******/
  } // eslint-disable-next-line no-unused-vars
  /******/
  /******/ /******/ function hotAddUpdateChunk(chunkId, moreModules) {
    /******/ if (
      !hotAvailableFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    )
      /******/ return;
    /******/ hotRequestedFilesMap[chunkId] = false;
    /******/ for (var moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ hotUpdate[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ hotUpdateDownloaded();
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotEnsureUpdateChunk(chunkId) {
    /******/ if (!hotAvailableFilesMap[chunkId]) {
      /******/ hotWaitingFilesMap[chunkId] = true;
      /******/
    } else {
      /******/ hotRequestedFilesMap[chunkId] = true;
      /******/ hotWaitingFiles++;
      /******/ hotDownloadUpdateChunk(chunkId);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotUpdateDownloaded() {
    /******/ hotSetStatus('ready');
    /******/ var deferred = hotDeferred;
    /******/ hotDeferred = null;
    /******/ if (!deferred) return;
    /******/ if (hotApplyOnUpdate) {
      /******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ // avoid triggering uncaught exception warning in Chrome.
      /******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ Promise.resolve()
        /******/ .then(function() {
          /******/ return hotApply(hotApplyOnUpdate);
          /******/
        })
        /******/ .then(
          /******/ function(result) {
            /******/ deferred.resolve(result);
            /******/
          },
          /******/ function(err) {
            /******/ deferred.reject(err);
            /******/
          },
          /******/
        );
      /******/
    } else {
      /******/ var outdatedModules = [];
      /******/ for (var id in hotUpdate) {
        /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ outdatedModules.push(toModuleId(id));
          /******/
        }
        /******/
      }
      /******/ deferred.resolve(outdatedModules);
      /******/
    }
    /******/
  }
  /******/
  /******/ function hotApply(options) {
    /******/ if (hotStatus !== 'ready')
      /******/ throw new Error('apply() is only allowed in ready status');
    /******/ options = options || {};
    /******/
    /******/ var cb;
    /******/ var i;
    /******/ var j;
    /******/ var module;
    /******/ var moduleId;
    /******/
    /******/ function getAffectedStuff(updateModuleId) {
      /******/ var outdatedModules = [updateModuleId];
      /******/ var outdatedDependencies = {};
      /******/
      /******/ var queue = outdatedModules.slice().map(function(id) {
        /******/ return {
          /******/ chain: [id],
          /******/ id: id,
          /******/
        };
        /******/
      });
      /******/ while (queue.length > 0) {
        /******/ var queueItem = queue.pop();
        /******/ var moduleId = queueItem.id;
        /******/ var chain = queueItem.chain;
        /******/ module = installedModules[moduleId];
        /******/ if (!module || module.hot._selfAccepted) continue;
        /******/ if (module.hot._selfDeclined) {
          /******/ return {
            /******/ type: 'self-declined',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ if (module.hot._main) {
          /******/ return {
            /******/ type: 'unaccepted',
            /******/ chain: chain,
            /******/ moduleId: moduleId,
            /******/
          };
          /******/
        }
        /******/ for (var i = 0; i < module.parents.length; i++) {
          /******/ var parentId = module.parents[i];
          /******/ var parent = installedModules[parentId];
          /******/ if (!parent) continue;
          /******/ if (parent.hot._declinedDependencies[moduleId]) {
            /******/ return {
              /******/ type: 'declined',
              /******/ chain: chain.concat([parentId]),
              /******/ moduleId: moduleId,
              /******/ parentId: parentId,
              /******/
            };
            /******/
          }
          /******/ if (outdatedModules.indexOf(parentId) !== -1) continue;
          /******/ if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ if (!outdatedDependencies[parentId])
              /******/ outdatedDependencies[parentId] = [];
            /******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ continue;
            /******/
          }
          /******/ delete outdatedDependencies[parentId];
          /******/ outdatedModules.push(parentId);
          /******/ queue.push({
            /******/ chain: chain.concat([parentId]),
            /******/ id: parentId,
            /******/
          });
          /******/
        }
        /******/
      }
      /******/
      /******/ return {
        /******/ type: 'accepted',
        /******/ moduleId: updateModuleId,
        /******/ outdatedModules: outdatedModules,
        /******/ outdatedDependencies: outdatedDependencies,
        /******/
      };
      /******/
    }
    /******/
    /******/ function addAllToSet(a, b) {
      /******/ for (var i = 0; i < b.length; i++) {
        /******/ var item = b[i];
        /******/ if (a.indexOf(item) === -1) a.push(item);
        /******/
      }
      /******/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /******/
    /******/ /******/ /******/ var outdatedDependencies = {};
    /******/ var outdatedModules = [];
    /******/ var appliedUpdate = {};
    /******/
    /******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ console.warn(
        /******/ '[HMR] unexpected require(' +
          result.moduleId +
          ') to disposed module',
        /******/
      );
      /******/
    };
    /******/
    /******/ for (var id in hotUpdate) {
      /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ moduleId = toModuleId(id); /** @type {TODO} */
        /******/ /******/ var result;
        /******/ if (hotUpdate[id]) {
          /******/ result = getAffectedStuff(moduleId);
          /******/
        } else {
          /******/ result = {
            /******/ type: 'disposed',
            /******/ moduleId: id,
            /******/
          };
          /******/
        } /** @type {Error|false} */
        /******/ /******/ var abortError = false;
        /******/ var doApply = false;
        /******/ var doDispose = false;
        /******/ var chainInfo = '';
        /******/ if (result.chain) {
          /******/ chainInfo =
            '\nUpdate propagation: ' + result.chain.join(' -> ');
          /******/
        }
        /******/ switch (result.type) {
          /******/ case 'self-declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of self decline: ' +
                  /******/ result.moduleId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'declined':
            /******/ if (options.onDeclined) options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                /******/ 'Aborted because of declined dependency: ' +
                  /******/ result.moduleId +
                  /******/ ' in ' +
                  /******/ result.parentId +
                  /******/ chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'unaccepted':
            /******/ if (options.onUnaccepted) options.onUnaccepted(result);
            /******/ if (!options.ignoreUnaccepted)
              /******/ abortError = new Error(
                /******/ 'Aborted because ' +
                  moduleId +
                  ' is not accepted' +
                  chainInfo,
                /******/
              );
            /******/ break;
          /******/ case 'accepted':
            /******/ if (options.onAccepted) options.onAccepted(result);
            /******/ doApply = true;
            /******/ break;
          /******/ case 'disposed':
            /******/ if (options.onDisposed) options.onDisposed(result);
            /******/ doDispose = true;
            /******/ break;
          /******/ default:
            /******/ throw new Error('Unexception type ' + result.type);
          /******/
        }
        /******/ if (abortError) {
          /******/ hotSetStatus('abort');
          /******/ return Promise.reject(abortError);
          /******/
        }
        /******/ if (doApply) {
          /******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ addAllToSet(outdatedModules, result.outdatedModules);
          /******/ for (moduleId in result.outdatedDependencies) {
            /******/ if (
              /******/ Object.prototype.hasOwnProperty.call(
                /******/ result.outdatedDependencies,
                /******/ moduleId,
                /******/
              )
              /******/
            ) {
              /******/ if (!outdatedDependencies[moduleId])
                /******/ outdatedDependencies[moduleId] = [];
              /******/ addAllToSet(
                /******/ outdatedDependencies[moduleId],
                /******/ result.outdatedDependencies[moduleId],
                /******/
              );
              /******/
            }
            /******/
          }
          /******/
        }
        /******/ if (doDispose) {
          /******/ addAllToSet(outdatedModules, [result.moduleId]);
          /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/
        }
        /******/
      }
      /******/
    } // Store self accepted outdated modules to require them later by the module system
    /******/
    /******/ /******/ var outdatedSelfAcceptedModules = [];
    /******/ for (i = 0; i < outdatedModules.length; i++) {
      /******/ moduleId = outdatedModules[i];
      /******/ if (
        /******/ installedModules[moduleId] &&
        /******/ installedModules[moduleId].hot._selfAccepted
        /******/
      )
        /******/ outdatedSelfAcceptedModules.push({
          /******/ module: moduleId,
          /******/ errorHandler: installedModules[moduleId].hot._selfAccepted,
          /******/
        });
      /******/
    } // Now in "dispose" phase
    /******/
    /******/ /******/ hotSetStatus('dispose');
    /******/ Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /******/ if (hotAvailableFilesMap[chunkId] === false) {
        /******/ hotDisposeChunk(chunkId);
        /******/
      }
      /******/
    });
    /******/
    /******/ var idx;
    /******/ var queue = outdatedModules.slice();
    /******/ while (queue.length > 0) {
      /******/ moduleId = queue.pop();
      /******/ module = installedModules[moduleId];
      /******/ if (!module) continue;
      /******/
      /******/ var data = {}; // Call dispose handlers
      /******/
      /******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
      /******/ for (j = 0; j < disposeHandlers.length; j++) {
        /******/ cb = disposeHandlers[j];
        /******/ cb(data);
        /******/
      }
      /******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /******/
      /******/ /******/ module.hot.active = false; // remove module from cache
      /******/
      /******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
      /******/
      /******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
      /******/
      /******/ /******/ for (j = 0; j < module.children.length; j++) {
        /******/ var child = installedModules[module.children[j]];
        /******/ if (!child) continue;
        /******/ idx = child.parents.indexOf(moduleId);
        /******/ if (idx >= 0) {
          /******/ child.parents.splice(idx, 1);
          /******/
        }
        /******/
      }
      /******/
    } // remove outdated dependency from module children
    /******/
    /******/ /******/ var dependency;
    /******/ var moduleOutdatedDependencies;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ dependency = moduleOutdatedDependencies[j];
            /******/ idx = module.children.indexOf(dependency);
            /******/ if (idx >= 0) module.children.splice(idx, 1);
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Not in "apply" phase
    /******/
    /******/ /******/ hotSetStatus('apply');
    /******/
    /******/ hotCurrentHash = hotUpdateNewHash; // insert new code
    /******/
    /******/ /******/ for (moduleId in appliedUpdate) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /******/ modules[moduleId] = appliedUpdate[moduleId];
        /******/
      }
      /******/
    } // call accept handlers
    /******/
    /******/ /******/ var error = null;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        /******/ Object.prototype.hasOwnProperty.call(
          outdatedDependencies,
          moduleId,
        )
        /******/
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ var callbacks = [];
          /******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ dependency = moduleOutdatedDependencies[i];
            /******/ cb = module.hot._acceptedDependencies[dependency];
            /******/ if (cb) {
              /******/ if (callbacks.indexOf(cb) !== -1) continue;
              /******/ callbacks.push(cb);
              /******/
            }
            /******/
          }
          /******/ for (i = 0; i < callbacks.length; i++) {
            /******/ cb = callbacks[i];
            /******/ try {
              /******/ cb(moduleOutdatedDependencies);
              /******/
            } catch (err) {
              /******/ if (options.onErrored) {
                /******/ options.onErrored({
                  /******/ type: 'accept-errored',
                  /******/ moduleId: moduleId,
                  /******/ dependencyId: moduleOutdatedDependencies[i],
                  /******/ error: err,
                  /******/
                });
                /******/
              }
              /******/ if (!options.ignoreErrored) {
                /******/ if (!error) error = err;
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Load self accepted modules
    /******/
    /******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ var item = outdatedSelfAcceptedModules[i];
      /******/ moduleId = item.module;
      /******/ hotCurrentParents = [moduleId];
      /******/ try {
        /******/ __webpack_require__(moduleId);
        /******/
      } catch (err) {
        /******/ if (typeof item.errorHandler === 'function') {
          /******/ try {
            /******/ item.errorHandler(err);
            /******/
          } catch (err2) {
            /******/ if (options.onErrored) {
              /******/ options.onErrored({
                /******/ type: 'self-accept-error-handler-errored',
                /******/ moduleId: moduleId,
                /******/ error: err2,
                /******/ originalError: err,
                /******/
              });
              /******/
            }
            /******/ if (!options.ignoreErrored) {
              /******/ if (!error) error = err2;
              /******/
            }
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        } else {
          /******/ if (options.onErrored) {
            /******/ options.onErrored({
              /******/ type: 'self-accept-errored',
              /******/ moduleId: moduleId,
              /******/ error: err,
              /******/
            });
            /******/
          }
          /******/ if (!options.ignoreErrored) {
            /******/ if (!error) error = err;
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // handle errors in accept handlers and self accepted module load
    /******/
    /******/ /******/ if (error) {
      /******/ hotSetStatus('fail');
      /******/ return Promise.reject(error);
      /******/
    }
    /******/
    /******/ hotSetStatus('idle');
    /******/ return new Promise(function(resolve) {
      /******/ resolve(outdatedModules);
      /******/
    });
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/ hot: hotCreateModule(moduleId),
      /******/ parents: ((hotCurrentParentsTemp = hotCurrentParents),
      (hotCurrentParents = []),
      hotCurrentParentsTemp),
      /******/ children: [],
      /******/ hot: hotCreateModule(moduleId),
      /******/ parents: ((hotCurrentParentsTemp = hotCurrentParents),
      (hotCurrentParents = []),
      hotCurrentParentsTemp),
      /******/ children: [],
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      hotCreateRequire(moduleId),
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode,
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '/'; // __webpack_hash__
  /******/
  /******/ /******/ __webpack_require__.h = function() {
    return hotCurrentHash;
  }; // __webpack_hash__
  /******/
  /******/ /******/ __webpack_require__.h = function() {
    return hotCurrentHash;
  }; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return hotCreateRequire('./src/config/config.js')(
    (__webpack_require__.s = './src/config/config.js'),
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/fonts.css':
      /*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/sass-loader/lib/loader.js??ref--9-2!./node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./src/styles/fonts.css ***!
  \**********************************************************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var escape = __webpack_require__(
          /*! ../../node_modules/css-loader/lib/url/escape.js */ './node_modules/css-loader/lib/url/escape.js',
        );
        exports = module.exports = __webpack_require__(
          /*! ../../node_modules/css-loader/lib/css-base.js */ './node_modules/css-loader/lib/css-base.js',
        )(true);
        // imports

        // module
        exports.push([
          module.i,
          "body {\n  background-color: #f4f7fc;\n  font-family: 'HK Grotesk', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0; }\n\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400; }\n\np::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n  background-color: #2f3542;\n  color: #fff; }\n  @media (max-width: 575.98px) {\n    p::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n      background-color: #fff;\n      color: #2f3542; } }\n\na {\n  text-decoration: none !important; }\n  a p,\n  a h1,\n  a h2,\n  a h3,\n  a h4,\n  a h5,\n  a h6,\n  a a,\n  a span {\n    color: #2f3542; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  letter-spacing: 1; }\n\nbutton:active, button:focus {\n  outline: 0 !important; }\n\nblockquote {\n  padding: 10px 20px;\n  background-color: #a4b0be;\n  font-style: italic;\n  font-size: 13.5px; }\n  blockquote p {\n    margin-bottom: 0; }\n\nsection {\n  margin-bottom: 20px; }\n\n.gif_player {\n  display: inline-block;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.gif_player .play_button {\n  background-color: rgba(0, 0, 0, 0.5);\n  border: 2px dashed rgba(225, 225, 225, 0.5);\n  border-radius: 50%;\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  cursor: pointer;\n  font-size: 24px;\n  left: 50%;\n  opacity: 1;\n  padding: 14px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(1) rotate(0deg);\n  transition: transform 0.4s, opacity 0.4s;\n  z-index: 1; }\n\n.gif_player .play_button:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7); }\n\n.gif_player .play_button::after {\n  content: \"GIF\"; }\n\n.gif_player.playing .play_button {\n  transform: translate(-50%, -50%) scale(0) rotate(180deg);\n  opacity: 0.5; }\n\n.tag {\n  font-weight: 700;\n  font-size: 12px;\n  border-radius: 2px;\n  background-color: #e5f3ff;\n  color: #2a85fe;\n  padding: 0px 4px;\n  margin-bottom: 0 !important; }\n\nabb,\nacronym {\n  cursor: help;\n  background-color: #2f7deb;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px; }\n\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url(" +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Regular.woff2 */ './src/assets/fonts/HKGrotesk-Regular.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Regular.woff */ './src/assets/fonts/HKGrotesk-Regular.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Regular.ttf */ './src/assets/fonts/HKGrotesk-Regular.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 400;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightItalic.woff2 */ './src/assets/fonts/HKGrotesk-LightItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightItalic.woff */ './src/assets/fonts/HKGrotesk-LightItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightItalic.ttf */ './src/assets/fonts/HKGrotesk-LightItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 300;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumItalic.woff2 */ './src/assets/fonts/HKGrotesk-MediumItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumItalic.woff */ './src/assets/fonts/HKGrotesk-MediumItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumItalic.ttf */ './src/assets/fonts/HKGrotesk-MediumItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 500;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Bold.woff2 */ './src/assets/fonts/HKGrotesk-Bold.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Bold.woff */ './src/assets/fonts/HKGrotesk-Bold.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Bold.ttf */ './src/assets/fonts/HKGrotesk-Bold.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 700;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Medium.woff2 */ './src/assets/fonts/HKGrotesk-Medium.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Medium.woff */ './src/assets/fonts/HKGrotesk-Medium.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Medium.ttf */ './src/assets/fonts/HKGrotesk-Medium.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 500;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Italic.woff2 */ './src/assets/fonts/HKGrotesk-Italic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Italic.woff */ './src/assets/fonts/HKGrotesk-Italic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Italic.ttf */ './src/assets/fonts/HKGrotesk-Italic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 400;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBold.woff2 */ './src/assets/fonts/HKGrotesk-SemiBold.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBold.woff */ './src/assets/fonts/HKGrotesk-SemiBold.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBold.ttf */ './src/assets/fonts/HKGrotesk-SemiBold.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 600;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldItalic.woff2 */ './src/assets/fonts/HKGrotesk-BoldItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldItalic.woff */ './src/assets/fonts/HKGrotesk-BoldItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldItalic.ttf */ './src/assets/fonts/HKGrotesk-BoldItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 700;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldItalic.woff2 */ './src/assets/fonts/HKGrotesk-SemiBoldItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldItalic.woff */ './src/assets/fonts/HKGrotesk-SemiBoldItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldItalic.ttf */ './src/assets/fonts/HKGrotesk-SemiBoldItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 600;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Light.woff2 */ './src/assets/fonts/HKGrotesk-Light.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Light.woff */ './src/assets/fonts/HKGrotesk-Light.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-Light.ttf */ './src/assets/fonts/HKGrotesk-Light.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 300;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk Medium Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacy.woff2 */ './src/assets/fonts/HKGrotesk-MediumLegacy.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacy.woff */ './src/assets/fonts/HKGrotesk-MediumLegacy.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacy.ttf */ './src/assets/fonts/HKGrotesk-MediumLegacy.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 500;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk SemiBold Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacy.woff2 */ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacy.woff */ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacy.ttf */ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 600;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk Medium Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacyItalic.woff2 */ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacyItalic.woff */ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-MediumLegacyItalic.ttf */ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 500;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LegacyItalic.woff2 */ './src/assets/fonts/HKGrotesk-LegacyItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LegacyItalic.woff */ './src/assets/fonts/HKGrotesk-LegacyItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LegacyItalic.ttf */ './src/assets/fonts/HKGrotesk-LegacyItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 400;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk Light Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacyItalic.woff2 */ './src/assets/fonts/HKGrotesk-LightLegacyItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacyItalic.woff */ './src/assets/fonts/HKGrotesk-LightLegacyItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacyItalic.ttf */ './src/assets/fonts/HKGrotesk-LightLegacyItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 300;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk Light Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacy.woff2 */ './src/assets/fonts/HKGrotesk-LightLegacy.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacy.woff */ './src/assets/fonts/HKGrotesk-LightLegacy.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-LightLegacy.ttf */ './src/assets/fonts/HKGrotesk-LightLegacy.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 300;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk SmBold Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff2 */ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff */ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.ttf */ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 600;\n  font-style: italic; }\n\n@font-face {\n  font-family: \'HK Grotesk Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacy.woff2 */ './src/assets/fonts/HKGrotesk-BoldLegacy.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacy.woff */ './src/assets/fonts/HKGrotesk-BoldLegacy.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacy.ttf */ './src/assets/fonts/HKGrotesk-BoldLegacy.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 700;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-RegularLegacy.woff2 */ './src/assets/fonts/HKGrotesk-RegularLegacy.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-RegularLegacy.woff */ './src/assets/fonts/HKGrotesk-RegularLegacy.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-RegularLegacy.ttf */ './src/assets/fonts/HKGrotesk-RegularLegacy.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 400;\n  font-style: normal; }\n\n@font-face {\n  font-family: \'HK Grotesk Legacy\';\n  src: url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacyItalic.woff2 */ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff2',
              ),
            ) +
            ') format("woff2"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacyItalic.woff */ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff',
              ),
            ) +
            ') format("woff"), url(' +
            escape(
              __webpack_require__(
                /*! ../assets/fonts/HKGrotesk-BoldLegacyItalic.ttf */ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.ttf',
              ),
            ) +
            ') format("truetype");\n  font-weight: 700;\n  font-style: italic; }\n',
          '',
          {
            version: 3,
            sources: [
              '/Users/virginiavelasquezsoto/FullStack/MarkerPinina/src/styles/src/styles/fonts.css',
            ],
            names: [],
            mappings:
              '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',
            file: 'fonts.css',
            sourcesContent: [
              "$black: #2f3542;\n$gray_light: #a4b0be;\n$gray_medium: #747d8c;\n$gray_dark: #57606f;\n$write_gray_1: #f1f2f6;\n$write_gray_2: #dfe4ea;\n$write_gray_3: #ced6e0;\n$blue: #2f7deb;\n$blue_medium: #1b4ed5;\nbody {\n  background-color: #f4f7fc;\n  font-family: 'HK Grotesk', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0;\n}\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400;\n}\np, h1, h2, h3, h4, h5, h6, a, span {\n  &::selection {\n    background-color: $black;\n    color: #fff;\n    @media (max-width: 575.98px) {\n      background-color: #fff;\n      color: $black;\n    }\n  }\n}\na {\n  text-decoration: none !important;\n  p,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  a,\n  span {\n    color: $black;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6, {\n  font-weight: 700;\n  letter-spacing: 1;\n}\nbutton {\n  &:active,\n  &:focus {\n   outline: 0 !important;\n  }\n}\nblockquote {\n  padding: 10px 20px;\n  background-color: $gray_light;\n  font-style: italic;\n  font-size: 13.5px;\n  p {\n    margin-bottom: 0;\n  }\n}\nsection {\n  margin-bottom: 20px;\n}\n:global {\n  .gif_player {\n    display: inline-block;\n    position: relative;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .gif_player .play_button {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px dashed rgba(225,225, 225, 0.5);\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    cursor: pointer;\n    font-size: 24px;\n    left: 50%;\n    opacity: 1;\n    padding: 14px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%) scale(1) rotate(0deg);\n    transition: transform 0.4s, opacity 0.4s;\n    z-index: 1;\n  }\n\n  .gif_player .play_button:hover {\n    background-color: rgba(0, 0, 0, 0.7);\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7);\n  }\n\n  .gif_player .play_button::after {\n    content: \"GIF\";\n  }\n\n  .gif_player.playing .play_button {\n    transform: translate(-50%, -50%) scale(0) rotate(180deg);\n    opacity: 0.5;\n  }\n}\n:global {\n  .tag {\n    font-weight: 700;\n    font-size: 12px;\n    border-radius: 2px;\n    background-color: #e5f3ff;\n    color: #2a85fe;\n    padding: 0px 4px;\n    margin-bottom: 0 !important;\n  }\n}\nabb,\nacronym {\n  cursor: help;\n  background-color: $blue;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px;\n}\n%boxWrapper {\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 20px;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-Regular.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-Regular.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-Regular.ttf') format('truetype');\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-LightItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-LightItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-LightItalic.ttf') format('truetype');\n  font-weight: 300;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-MediumItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-MediumItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-MediumItalic.ttf') format('truetype');\n  font-weight: 500;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-Bold.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-Bold.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-Bold.ttf') format('truetype');\n  font-weight: 700;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-Medium.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-Medium.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-Medium.ttf') format('truetype');\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-Italic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-Italic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-Italic.ttf') format('truetype');\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-SemiBold.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-SemiBold.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-SemiBold.ttf') format('truetype');\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-BoldItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-BoldItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-BoldItalic.ttf') format('truetype');\n  font-weight: 700;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-SemiBoldItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-SemiBoldItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-SemiBoldItalic.ttf') format('truetype');\n  font-weight: 600;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk';\n  src: url('../assets/fonts/HKGrotesk-Light.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-Light.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-Light.ttf') format('truetype');\n  font-weight: 300;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk Medium Legacy';\n  src: url('../assets/fonts/HKGrotesk-MediumLegacy.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-MediumLegacy.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-MediumLegacy.ttf') format('truetype');\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk SemiBold Legacy';\n  src: url('../assets/fonts/HKGrotesk-SemiBoldLegacy.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-SemiBoldLegacy.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-SemiBoldLegacy.ttf') format('truetype');\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk Medium Legacy';\n  src: url('../assets/fonts/HKGrotesk-MediumLegacyItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-MediumLegacyItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-MediumLegacyItalic.ttf') format('truetype');\n  font-weight: 500;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk Legacy';\n  src: url('../assets/fonts/HKGrotesk-LegacyItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-LegacyItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-LegacyItalic.ttf') format('truetype');\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk Light Legacy';\n  src: url('../assets/fonts/HKGrotesk-LightLegacyItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-LightLegacyItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-LightLegacyItalic.ttf') format('truetype');\n  font-weight: 300;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk Light Legacy';\n  src: url('../assets/fonts/HKGrotesk-LightLegacy.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-LightLegacy.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-LightLegacy.ttf') format('truetype');\n  font-weight: 300;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk SmBold Legacy';\n  src: url('../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff2')\n      format('woff2'),\n    url('../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-SemiBoldLegacyItalic.ttf') format('truetype');\n  font-weight: 600;\n  font-style: italic;\n}\n@font-face {\n  font-family: 'HK Grotesk Legacy';\n  src: url('../assets/fonts/HKGrotesk-BoldLegacy.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-BoldLegacy.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-BoldLegacy.ttf') format('truetype');\n  font-weight: 700;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'HK Grotesk Legacy';\n  src: url('../assets/fonts/HKGrotesk-RegularLegacy.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-RegularLegacy.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-RegularLegacy.ttf') format('truetype');\n  font-weight: 400;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'HK Grotesk Legacy';\n  src: url('../assets/fonts/HKGrotesk-BoldLegacyItalic.woff2') format('woff2'),\n    url('../assets/fonts/HKGrotesk-BoldLegacyItalic.woff') format('woff'),\n    url('../assets/fonts/HKGrotesk-BoldLegacyItalic.ttf') format('truetype');\n  font-weight: 700;\n  font-style: italic;\n}\n",
            ],
            sourceRoot: '',
          },
        ]);

        // exports

        /***/
      },

    /***/ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/global.scss':
      /*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/sass-loader/lib/loader.js??ref--9-2!./node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./src/styles/global.scss ***!
  \************************************************************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(
          /*! ../../node_modules/css-loader/lib/css-base.js */ './node_modules/css-loader/lib/css-base.js',
        )(true);
        // imports

        // module
        exports.push([
          module.i,
          'body {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0; }\n\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400; }\n\np::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n  background-color: #2f3542;\n  color: #fff; }\n  @media (max-width: 575.98px) {\n    p::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n      background-color: #fff;\n      color: #2f3542; } }\n\na {\n  text-decoration: none !important; }\n  a p,\n  a h1,\n  a h2,\n  a h3,\n  a h4,\n  a h5,\n  a h6,\n  a a,\n  a span {\n    color: #2f3542; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  letter-spacing: 1; }\n\nbutton:active, button:focus {\n  outline: 0 !important; }\n\nblockquote {\n  padding: 10px 20px;\n  background-color: #a4b0be;\n  font-style: italic;\n  font-size: 13.5px; }\n  blockquote p {\n    margin-bottom: 0; }\n\nsection {\n  margin-bottom: 20px; }\n\n.gif_player {\n  display: inline-block;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.gif_player .play_button {\n  background-color: rgba(0, 0, 0, 0.5);\n  border: 2px dashed rgba(225, 225, 225, 0.5);\n  border-radius: 50%;\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  cursor: pointer;\n  font-size: 24px;\n  left: 50%;\n  opacity: 1;\n  padding: 14px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(1) rotate(0deg);\n  transition: transform 0.4s, opacity 0.4s;\n  z-index: 1; }\n\n.gif_player .play_button:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7); }\n\n.gif_player .play_button::after {\n  content: "GIF"; }\n\n.gif_player.playing .play_button {\n  transform: translate(-50%, -50%) scale(0) rotate(180deg);\n  opacity: 0.5; }\n\n.tag {\n  font-weight: 700;\n  font-size: 12px;\n  border-radius: 2px;\n  background-color: #e5f3ff;\n  color: #2a85fe;\n  padding: 0px 4px;\n  margin-bottom: 0 !important; }\n\nabb,\nacronym {\n  cursor: help;\n  background-color: #2f7deb;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px; }\n\nbody {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0; }\n\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400; }\n\np::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n  background-color: #2f3542;\n  color: #fff; }\n  @media (max-width: 575.98px) {\n    p::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n      background-color: #fff;\n      color: #2f3542; } }\n\na {\n  text-decoration: none !important; }\n  a p,\n  a h1,\n  a h2,\n  a h3,\n  a h4,\n  a h5,\n  a h6,\n  a a,\n  a span {\n    color: #2f3542; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  letter-spacing: 1; }\n\nbutton:active, button:focus {\n  outline: 0 !important; }\n\nblockquote {\n  padding: 10px 20px;\n  background-color: #a4b0be;\n  font-style: italic;\n  font-size: 13.5px; }\n  blockquote p {\n    margin-bottom: 0; }\n\nsection {\n  margin-bottom: 20px; }\n\n.gif_player {\n  display: inline-block;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.gif_player .play_button {\n  background-color: rgba(0, 0, 0, 0.5);\n  border: 2px dashed rgba(225, 225, 225, 0.5);\n  border-radius: 50%;\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  cursor: pointer;\n  font-size: 24px;\n  left: 50%;\n  opacity: 1;\n  padding: 14px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(1) rotate(0deg);\n  transition: transform 0.4s, opacity 0.4s;\n  z-index: 1; }\n\n.gif_player .play_button:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7); }\n\n.gif_player .play_button::after {\n  content: "GIF"; }\n\n.gif_player.playing .play_button {\n  transform: translate(-50%, -50%) scale(0) rotate(180deg);\n  opacity: 0.5; }\n\n.tag {\n  font-weight: 700;\n  font-size: 12px;\n  border-radius: 2px;\n  background-color: #e5f3ff;\n  color: #2a85fe;\n  padding: 0px 4px;\n  margin-bottom: 0 !important; }\n\nabb,\nacronym {\n  cursor: help;\n  background-color: #2f7deb;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px; }\n',
          '',
          {
            version: 3,
            sources: [
              '/Users/virginiavelasquezsoto/FullStack/MarkerPinina/src/styles/src/styles/global.scss',
            ],
            names: [],
            mappings:
              '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',
            file: 'global.scss',
            sourcesContent: [
              '$black: #2f3542;\n$gray_light: #a4b0be;\n$gray_medium: #747d8c;\n$gray_dark: #57606f;\n$write_gray_1: #f1f2f6;\n$write_gray_2: #dfe4ea;\n$write_gray_3: #ced6e0;\n$blue: #2f7deb;\n$blue_medium: #1b4ed5;\nbody {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0;\n}\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400;\n}\np, h1, h2, h3, h4, h5, h6, a, span {\n  &::selection {\n    background-color: $black;\n    color: #fff;\n    @media (max-width: 575.98px) {\n      background-color: #fff;\n      color: $black;\n    }\n  }\n}\na {\n  text-decoration: none !important;\n  p,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  a,\n  span {\n    color: $black;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6, {\n  font-weight: 700;\n  letter-spacing: 1;\n}\nbutton {\n  &:active,\n  &:focus {\n   outline: 0 !important;\n  }\n}\nblockquote {\n  padding: 10px 20px;\n  background-color: $gray_light;\n  font-style: italic;\n  font-size: 13.5px;\n  p {\n    margin-bottom: 0;\n  }\n}\nsection {\n  margin-bottom: 20px;\n}\n:global {\n  .gif_player {\n    display: inline-block;\n    position: relative;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .gif_player .play_button {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px dashed rgba(225,225, 225, 0.5);\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    cursor: pointer;\n    font-size: 24px;\n    left: 50%;\n    opacity: 1;\n    padding: 14px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%) scale(1) rotate(0deg);\n    transition: transform 0.4s, opacity 0.4s;\n    z-index: 1;\n  }\n\n  .gif_player .play_button:hover {\n    background-color: rgba(0, 0, 0, 0.7);\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7);\n  }\n\n  .gif_player .play_button::after {\n    content: "GIF";\n  }\n\n  .gif_player.playing .play_button {\n    transform: translate(-50%, -50%) scale(0) rotate(180deg);\n    opacity: 0.5;\n  }\n}\n:global {\n  .tag {\n    font-weight: 700;\n    font-size: 12px;\n    border-radius: 2px;\n    background-color: #e5f3ff;\n    color: #2a85fe;\n    padding: 0px 4px;\n    margin-bottom: 0 !important;\n  }\n}\nabb,\nacronym {\n  cursor: help;\n  background-color: $blue;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px;\n}\n%boxWrapper {\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 20px;\n}\nbody {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0;\n}\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400;\n}\np, h1, h2, h3, h4, h5, h6, a, span {\n  &::selection {\n    background-color: $black;\n    color: #fff;\n    @media (max-width: 575.98px) {\n      background-color: #fff;\n      color: $black;\n    }\n  }\n}\na {\n  text-decoration: none !important;\n  p,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  a,\n  span {\n    color: $black;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6, {\n  font-weight: 700;\n  letter-spacing: 1;\n}\nbutton {\n  &:active,\n  &:focus {\n   outline: 0 !important;\n  }\n}\nblockquote {\n  padding: 10px 20px;\n  background-color: $gray_light;\n  font-style: italic;\n  font-size: 13.5px;\n  p {\n    margin-bottom: 0;\n  }\n}\nsection {\n  margin-bottom: 20px;\n}\n:global {\n  .gif_player {\n    display: inline-block;\n    position: relative;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .gif_player .play_button {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px dashed rgba(225,225, 225, 0.5);\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    cursor: pointer;\n    font-size: 24px;\n    left: 50%;\n    opacity: 1;\n    padding: 14px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%) scale(1) rotate(0deg);\n    transition: transform 0.4s, opacity 0.4s;\n    z-index: 1;\n  }\n\n  .gif_player .play_button:hover {\n    background-color: rgba(0, 0, 0, 0.7);\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7);\n  }\n\n  .gif_player .play_button::after {\n    content: "GIF";\n  }\n\n  .gif_player.playing .play_button {\n    transform: translate(-50%, -50%) scale(0) rotate(180deg);\n    opacity: 0.5;\n  }\n}\n:global {\n  .tag {\n    font-weight: 700;\n    font-size: 12px;\n    border-radius: 2px;\n    background-color: #e5f3ff;\n    color: #2a85fe;\n    padding: 0px 4px;\n    margin-bottom: 0 !important;\n  }\n}\nabb,\nacronym {\n  cursor: help;\n  background-color: $blue;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px;\n}\n%boxWrapper {\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 20px;\n}',
            ],
            sourceRoot: '',
          },
        ]);

        // exports

        /***/
      },

    /***/ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/imports.scss':
      /*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/sass-loader/lib/loader.js??ref--9-2!./node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./src/styles/imports.scss ***!
  \*************************************************************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(
          /*! ../../node_modules/css-loader/lib/css-base.js */ './node_modules/css-loader/lib/css-base.js',
        )(true);
        // imports
        exports.push([
          module.i,
          '@import url(https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Comfortaa:300,400,700|Lato:100,100i,300,300i,400,400i,700,700i,900,900i|Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);',
          '',
        ]);

        // module
        exports.push([
          module.i,
          'body {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0; }\n\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400; }\n\np::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n  background-color: #2f3542;\n  color: #fff; }\n  @media (max-width: 575.98px) {\n    p::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n      background-color: #fff;\n      color: #2f3542; } }\n\na {\n  text-decoration: none !important; }\n  a p,\n  a h1,\n  a h2,\n  a h3,\n  a h4,\n  a h5,\n  a h6,\n  a a,\n  a span {\n    color: #2f3542; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  letter-spacing: 1; }\n\nbutton:active, button:focus {\n  outline: 0 !important; }\n\nblockquote {\n  padding: 10px 20px;\n  background-color: #a4b0be;\n  font-style: italic;\n  font-size: 13.5px; }\n  blockquote p {\n    margin-bottom: 0; }\n\nsection {\n  margin-bottom: 20px; }\n\n.gif_player {\n  display: inline-block;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.gif_player .play_button {\n  background-color: rgba(0, 0, 0, 0.5);\n  border: 2px dashed rgba(225, 225, 225, 0.5);\n  border-radius: 50%;\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  cursor: pointer;\n  font-size: 24px;\n  left: 50%;\n  opacity: 1;\n  padding: 14px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(1) rotate(0deg);\n  transition: transform 0.4s, opacity 0.4s;\n  z-index: 1; }\n\n.gif_player .play_button:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7); }\n\n.gif_player .play_button::after {\n  content: "GIF"; }\n\n.gif_player.playing .play_button {\n  transform: translate(-50%, -50%) scale(0) rotate(180deg);\n  opacity: 0.5; }\n\n.tag {\n  font-weight: 700;\n  font-size: 12px;\n  border-radius: 2px;\n  background-color: #e5f3ff;\n  color: #2a85fe;\n  padding: 0px 4px;\n  margin-bottom: 0 !important; }\n\nabb,\nacronym {\n  cursor: help;\n  background-color: #2f7deb;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px; }\n',
          '',
          {
            version: 3,
            sources: [
              '/Users/virginiavelasquezsoto/FullStack/MarkerPinina/src/styles/src/styles/imports.scss',
            ],
            names: [],
            mappings:
              'AASA;EACE,0BAAyB;EACzB,iDAAgD;EAChD,iBAAgB;EAChB,kBAAiB,EAClB;;AACD;EACE,kBAAiB;EACjB,YAAW;EACX,kBAAiB;EACjB,iBAAgB,EACjB;;AACD;EAEI,0BAvBW;EAwBX,YAAW,EAKZ;EAJC;IAJJ;MAKM,uBAAsB;MACtB,eA3BS,EA6BZ,EAAA;;AAEH;EACE,iCAAgC,EAYjC;EAbD;;;;;;;;;IAWI,eA1CW,EA2CZ;;AAEH;;;;;;EAME,iBAAgB;EAChB,kBAAiB,EAClB;;AACD;EAGG,sBAAqB,EACrB;;AAEH;EACE,mBAAkB;EAClB,0BA7DkB;EA8DlB,mBAAkB;EAClB,kBAAiB,EAIlB;EARD;IAMI,iBAAgB,EACjB;;AAEH;EACE,oBAAmB,EACpB;;AACD;EAEI,sBAAqB;EACrB,mBAAkB;EAClB,0BAAyB;EACzB,uBAAsB;EACtB,sBAAqB;EACrB,kBAAiB;EACjB,4BAA2B;EAC3B,yCAAwC,EACzC;;AAVH;EAaI,qCAAoC;EACpC,4CAA0C;EAC1C,mBAAkB;EAClB,yCAAwC;EACxC,YAAW;EACX,gBAAe;EACf,gBAAe;EACf,UAAS;EACT,WAAU;EACV,cAAa;EACb,mBAAkB;EAClB,SAAQ;EACR,uDAAsD;EACtD,yCAAwC;EACxC,WAAU,EACX;;AA5BH;EA+BI,qCAAoC;EACpC,yCAAwC,EACzC;;AAjCH;EAoCI,eAAc,EACf;;AArCH;EAwCI,yDAAwD;EACxD,aAAY,EACb;;AAEH;EAEI,iBAAgB;EAChB,gBAAe;EACf,mBAAkB;EAClB,0BAAyB;EACzB,eAAc;EACd,iBAAgB;EAChB,4BAA2B,EAC5B;;AAEH;;EAEE,aAAY;EACZ,0BA3HY;EA4HZ,YAAW;EACX,gBAAe;EACf,aAAY;EACZ,mBAAkB,EACnB',
            file: 'imports.scss',
            sourcesContent: [
              "$black: #2f3542;\n$gray_light: #a4b0be;\n$gray_medium: #747d8c;\n$gray_dark: #57606f;\n$write_gray_1: #f1f2f6;\n$write_gray_2: #dfe4ea;\n$write_gray_3: #ced6e0;\n$blue: #2f7deb;\n$blue_medium: #1b4ed5;\nbody {\n  background-color: #f4f7fc;\n  font-family: 'HK Grotesk', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0;\n}\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400;\n}\np, h1, h2, h3, h4, h5, h6, a, span {\n  &::selection {\n    background-color: $black;\n    color: #fff;\n    @media (max-width: 575.98px) {\n      background-color: #fff;\n      color: $black;\n    }\n  }\n}\na {\n  text-decoration: none !important;\n  p,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  a,\n  span {\n    color: $black;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6, {\n  font-weight: 700;\n  letter-spacing: 1;\n}\nbutton {\n  &:active,\n  &:focus {\n   outline: 0 !important;\n  }\n}\nblockquote {\n  padding: 10px 20px;\n  background-color: $gray_light;\n  font-style: italic;\n  font-size: 13.5px;\n  p {\n    margin-bottom: 0;\n  }\n}\nsection {\n  margin-bottom: 20px;\n}\n:global {\n  .gif_player {\n    display: inline-block;\n    position: relative;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .gif_player .play_button {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px dashed rgba(225,225, 225, 0.5);\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    cursor: pointer;\n    font-size: 24px;\n    left: 50%;\n    opacity: 1;\n    padding: 14px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%) scale(1) rotate(0deg);\n    transition: transform 0.4s, opacity 0.4s;\n    z-index: 1;\n  }\n\n  .gif_player .play_button:hover {\n    background-color: rgba(0, 0, 0, 0.7);\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7);\n  }\n\n  .gif_player .play_button::after {\n    content: \"GIF\";\n  }\n\n  .gif_player.playing .play_button {\n    transform: translate(-50%, -50%) scale(0) rotate(180deg);\n    opacity: 0.5;\n  }\n}\n:global {\n  .tag {\n    font-weight: 700;\n    font-size: 12px;\n    border-radius: 2px;\n    background-color: #e5f3ff;\n    color: #2a85fe;\n    padding: 0px 4px;\n    margin-bottom: 0 !important;\n  }\n}\nabb,\nacronym {\n  cursor: help;\n  background-color: $blue;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px;\n}\n%boxWrapper {\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 20px;\n}\n@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Comfortaa:300,400,700|Lato:100,100i,300,300i,400,400i,700,700i,900,900i|Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');",
            ],
            sourceRoot: '',
          },
        ]);

        // exports

        /***/
      },

    /***/ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/variables.scss':
      /*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/sass-loader/lib/loader.js??ref--9-2!./node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./src/styles/variables.scss ***!
  \***************************************************************************************************************************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(
          /*! ../../node_modules/css-loader/lib/css-base.js */ './node_modules/css-loader/lib/css-base.js',
        )(true);
        // imports

        // module
        exports.push([
          module.i,
          'body {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0; }\n\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400; }\n\np::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n  background-color: #2f3542;\n  color: #fff; }\n  @media (max-width: 575.98px) {\n    p::selection, h1::selection, h2::selection, h3::selection, h4::selection, h5::selection, h6::selection, a::selection, span::selection {\n      background-color: #fff;\n      color: #2f3542; } }\n\na {\n  text-decoration: none !important; }\n  a p,\n  a h1,\n  a h2,\n  a h3,\n  a h4,\n  a h5,\n  a h6,\n  a a,\n  a span {\n    color: #2f3542; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  letter-spacing: 1; }\n\nbutton:active, button:focus {\n  outline: 0 !important; }\n\nblockquote {\n  padding: 10px 20px;\n  background-color: #a4b0be;\n  font-style: italic;\n  font-size: 13.5px; }\n  blockquote p {\n    margin-bottom: 0; }\n\nsection {\n  margin-bottom: 20px; }\n\n.gif_player {\n  display: inline-block;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.gif_player .play_button {\n  background-color: rgba(0, 0, 0, 0.5);\n  border: 2px dashed rgba(225, 225, 225, 0.5);\n  border-radius: 50%;\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  cursor: pointer;\n  font-size: 24px;\n  left: 50%;\n  opacity: 1;\n  padding: 14px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%) scale(1) rotate(0deg);\n  transition: transform 0.4s, opacity 0.4s;\n  z-index: 1; }\n\n.gif_player .play_button:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7); }\n\n.gif_player .play_button::after {\n  content: "GIF"; }\n\n.gif_player.playing .play_button {\n  transform: translate(-50%, -50%) scale(0) rotate(180deg);\n  opacity: 0.5; }\n\n.tag {\n  font-weight: 700;\n  font-size: 12px;\n  border-radius: 2px;\n  background-color: #e5f3ff;\n  color: #2a85fe;\n  padding: 0px 4px;\n  margin-bottom: 0 !important; }\n\nabb,\nacronym {\n  cursor: help;\n  background-color: #2f7deb;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px; }\n',
          '',
          {
            version: 3,
            sources: [
              '/Users/virginiavelasquezsoto/FullStack/MarkerPinina/src/styles/src/styles/variables.scss',
            ],
            names: [],
            mappings:
              'AASA;EACE,0BAAyB;EACzB,iDAAgD;EAChD,iBAAgB;EAChB,kBAAiB,EAClB;;AACD;EACE,kBAAiB;EACjB,YAAW;EACX,kBAAiB;EACjB,iBAAgB,EACjB;;AACD;EAEI,0BAvBW;EAwBX,YAAW,EAKZ;EAJC;IAJJ;MAKM,uBAAsB;MACtB,eA3BS,EA6BZ,EAAA;;AAEH;EACE,iCAAgC,EAYjC;EAbD;;;;;;;;;IAWI,eA1CW,EA2CZ;;AAEH;;;;;;EAME,iBAAgB;EAChB,kBAAiB,EAClB;;AACD;EAGG,sBAAqB,EACrB;;AAEH;EACE,mBAAkB;EAClB,0BA7DkB;EA8DlB,mBAAkB;EAClB,kBAAiB,EAIlB;EARD;IAMI,iBAAgB,EACjB;;AAEH;EACE,oBAAmB,EACpB;;AACD;EAEI,sBAAqB;EACrB,mBAAkB;EAClB,0BAAyB;EACzB,uBAAsB;EACtB,sBAAqB;EACrB,kBAAiB;EACjB,4BAA2B;EAC3B,yCAAwC,EACzC;;AAVH;EAaI,qCAAoC;EACpC,4CAA0C;EAC1C,mBAAkB;EAClB,yCAAwC;EACxC,YAAW;EACX,gBAAe;EACf,gBAAe;EACf,UAAS;EACT,WAAU;EACV,cAAa;EACb,mBAAkB;EAClB,SAAQ;EACR,uDAAsD;EACtD,yCAAwC;EACxC,WAAU,EACX;;AA5BH;EA+BI,qCAAoC;EACpC,yCAAwC,EACzC;;AAjCH;EAoCI,eAAc,EACf;;AArCH;EAwCI,yDAAwD;EACxD,aAAY,EACb;;AAEH;EAEI,iBAAgB;EAChB,gBAAe;EACf,mBAAkB;EAClB,0BAAyB;EACzB,eAAc;EACd,iBAAgB;EAChB,4BAA2B,EAC5B;;AAEH;;EAEE,aAAY;EACZ,0BA3HY;EA4HZ,YAAW;EACX,gBAAe;EACf,aAAY;EACZ,mBAAkB,EACnB',
            file: 'variables.scss',
            sourcesContent: [
              '$black: #2f3542;\n$gray_light: #a4b0be;\n$gray_medium: #747d8c;\n$gray_dark: #57606f;\n$write_gray_1: #f1f2f6;\n$write_gray_2: #dfe4ea;\n$write_gray_3: #ced6e0;\n$blue: #2f7deb;\n$blue_medium: #1b4ed5;\nbody {\n  background-color: #f4f7fc;\n  font-family: \'HK Grotesk\', sans-serif !important;\n  margin-top: 70px;\n  padding: 40px 0 0;\n}\np {\n  line-height: 24px;\n  color: #555;\n  word-spacing: 2px;\n  font-weight: 400;\n}\np, h1, h2, h3, h4, h5, h6, a, span {\n  &::selection {\n    background-color: $black;\n    color: #fff;\n    @media (max-width: 575.98px) {\n      background-color: #fff;\n      color: $black;\n    }\n  }\n}\na {\n  text-decoration: none !important;\n  p,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  a,\n  span {\n    color: $black;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6, {\n  font-weight: 700;\n  letter-spacing: 1;\n}\nbutton {\n  &:active,\n  &:focus {\n   outline: 0 !important;\n  }\n}\nblockquote {\n  padding: 10px 20px;\n  background-color: $gray_light;\n  font-style: italic;\n  font-size: 13.5px;\n  p {\n    margin-bottom: 0;\n  }\n}\nsection {\n  margin-bottom: 20px;\n}\n:global {\n  .gif_player {\n    display: inline-block;\n    position: relative;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .gif_player .play_button {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 2px dashed rgba(225,225, 225, 0.5);\n    border-radius: 50%;\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);\n    color: #fff;\n    cursor: pointer;\n    font-size: 24px;\n    left: 50%;\n    opacity: 1;\n    padding: 14px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%) scale(1) rotate(0deg);\n    transition: transform 0.4s, opacity 0.4s;\n    z-index: 1;\n  }\n\n  .gif_player .play_button:hover {\n    background-color: rgba(0, 0, 0, 0.7);\n    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7);\n  }\n\n  .gif_player .play_button::after {\n    content: "GIF";\n  }\n\n  .gif_player.playing .play_button {\n    transform: translate(-50%, -50%) scale(0) rotate(180deg);\n    opacity: 0.5;\n  }\n}\n:global {\n  .tag {\n    font-weight: 700;\n    font-size: 12px;\n    border-radius: 2px;\n    background-color: #e5f3ff;\n    color: #2a85fe;\n    padding: 0px 4px;\n    margin-bottom: 0 !important;\n  }\n}\nabb,\nacronym {\n  cursor: help;\n  background-color: $blue;\n  color: #fff;\n  font-size: 14px;\n  padding: 4px;\n  border-radius: 2px;\n}\n%boxWrapper {\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 20px;\n}\n$black: #2f3542;\n$gray_light: #a4b0be;\n$gray_medium: #747d8c;\n$gray_dark: #57606f;\n$write_gray_1: #f1f2f6;\n$write_gray_2: #dfe4ea;\n$write_gray_3: #ced6e0;\n$blue: #2f7deb;\n$blue_medium: #1b4ed5;',
            ],
            sourceRoot: '',
          },
        ]);

        // exports

        /***/
      },

    /***/ './node_modules/css-loader/lib/css-base.js':
      /*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
        // css base code, injected by the css-loader
        module.exports = function(useSourceMap) {
          var list = [];

          // return the list of modules as css string
          list.toString = function toString() {
            return this.map(function(item) {
              var content = cssWithMappingToString(item, useSourceMap);
              if (item[2]) {
                return '@media ' + item[2] + '{' + content + '}';
              } else {
                return content;
              }
            }).join('');
          };

          // import a list of modules into the list
          list.i = function(modules, mediaQuery) {
            if (typeof modules === 'string') modules = [[null, modules, '']];
            var alreadyImportedModules = {};
            for (var i = 0; i < this.length; i++) {
              var id = this[i][0];
              if (typeof id === 'number') alreadyImportedModules[id] = true;
            }
            for (i = 0; i < modules.length; i++) {
              var item = modules[i];
              // skip already imported module
              // this implementation is not 100% perfect for weird media query combinations
              //  when a module is imported multiple times with different media queries.
              //  I hope this will never occur (Hey this way we have smaller bundles)
              if (
                typeof item[0] !== 'number' ||
                !alreadyImportedModules[item[0]]
              ) {
                if (mediaQuery && !item[2]) {
                  item[2] = mediaQuery;
                } else if (mediaQuery) {
                  item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
                }
                list.push(item);
              }
            }
          };
          return list;
        };

        function cssWithMappingToString(item, useSourceMap) {
          var content = item[1] || '';
          var cssMapping = item[3];
          if (!cssMapping) {
            return content;
          }

          if (useSourceMap && typeof btoa === 'function') {
            var sourceMapping = toComment(cssMapping);
            var sourceURLs = cssMapping.sources.map(function(source) {
              return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
            });

            return [content]
              .concat(sourceURLs)
              .concat([sourceMapping])
              .join('\n');
          }

          return [content].join('\n');
        }

        // Adapted from convert-source-map (MIT)
        function toComment(sourceMap) {
          // eslint-disable-next-line no-undef
          var base64 = btoa(
            unescape(encodeURIComponent(JSON.stringify(sourceMap))),
          );
          var data =
            'sourceMappingURL=data:application/json;charset=utf-8;base64,' +
            base64;

          return '/*# ' + data + ' */';
        }

        /***/
      },

    /***/ './node_modules/css-loader/lib/url/escape.js':
      /*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function escape(url) {
          if (typeof url !== 'string') {
            return url;
          }
          // If url is already wrapped in quotes, remove them
          if (/^['"].*['"]$/.test(url)) {
            url = url.slice(1, -1);
          }
          // Should url be wrapped?
          // See https://drafts.csswg.org/css-values-3/#urls
          if (/["'() \t\n]/.test(url)) {
            return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
          }

          return url;
        };

        /***/
      },

    /***/ './node_modules/style-loader/lib/addStyles.js':
      /*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

        var stylesInDom = {};

        var memoize = function(fn) {
          var memo;

          return function() {
            if (typeof memo === 'undefined') memo = fn.apply(this, arguments);
            return memo;
          };
        };

        var isOldIE = memoize(function() {
          // Test for IE <= 9 as proposed by Browserhacks
          // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
          // Tests for existence of standard globals is to allow style-loader
          // to operate correctly into non-standard environments
          // @see https://github.com/webpack-contrib/style-loader/issues/177
          return window && document && document.all && !window.atob;
        });

        var getTarget = function(target, parent) {
          if (parent) {
            return parent.querySelector(target);
          }
          return document.querySelector(target);
        };

        var getElement = (function(fn) {
          var memo = {};

          return function(target, parent) {
            // If passing function in options, then use it for resolve "head" element.
            // Useful for Shadow Root style i.e
            // {
            //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
            // }
            if (typeof target === 'function') {
              return target();
            }
            if (typeof memo[target] === 'undefined') {
              var styleTarget = getTarget.call(this, target, parent);
              // Special case to return head of iframe instead of iframe itself
              if (
                window.HTMLIFrameElement &&
                styleTarget instanceof window.HTMLIFrameElement
              ) {
                try {
                  // This will throw an exception if access to iframe is blocked
                  // due to cross-origin restrictions
                  styleTarget = styleTarget.contentDocument.head;
                } catch (e) {
                  styleTarget = null;
                }
              }
              memo[target] = styleTarget;
            }
            return memo[target];
          };
        })();

        var singleton = null;
        var singletonCounter = 0;
        var stylesInsertedAtTop = [];

        var fixUrls = __webpack_require__(
          /*! ./urls */ './node_modules/style-loader/lib/urls.js',
        );

        module.exports = function(list, options) {
          if (typeof DEBUG !== 'undefined' && DEBUG) {
            if (typeof document !== 'object')
              throw new Error(
                'The style-loader cannot be used in a non-browser environment',
              );
          }

          options = options || {};

          options.attrs =
            typeof options.attrs === 'object' ? options.attrs : {};

          // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
          // tags it will allow on a page
          if (!options.singleton && typeof options.singleton !== 'boolean')
            options.singleton = isOldIE();

          // By default, add <style> tags to the <head> element
          if (!options.insertInto) options.insertInto = 'head';

          // By default, add <style> tags to the bottom of the target
          if (!options.insertAt) options.insertAt = 'bottom';

          var styles = listToStyles(list, options);

          addStylesToDom(styles, options);

          return function update(newList) {
            var mayRemove = [];

            for (var i = 0; i < styles.length; i++) {
              var item = styles[i];
              var domStyle = stylesInDom[item.id];

              domStyle.refs--;
              mayRemove.push(domStyle);
            }

            if (newList) {
              var newStyles = listToStyles(newList, options);
              addStylesToDom(newStyles, options);
            }

            for (var i = 0; i < mayRemove.length; i++) {
              var domStyle = mayRemove[i];

              if (domStyle.refs === 0) {
                for (var j = 0; j < domStyle.parts.length; j++)
                  domStyle.parts[j]();

                delete stylesInDom[domStyle.id];
              }
            }
          };
        };

        function addStylesToDom(styles, options) {
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];

            if (domStyle) {
              domStyle.refs++;

              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j](item.parts[j]);
              }

              for (; j < item.parts.length; j++) {
                domStyle.parts.push(addStyle(item.parts[j], options));
              }
            } else {
              var parts = [];

              for (var j = 0; j < item.parts.length; j++) {
                parts.push(addStyle(item.parts[j], options));
              }

              stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
            }
          }
        }

        function listToStyles(list, options) {
          var styles = [];
          var newStyles = {};

          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = options.base ? item[0] + options.base : item[0];
            var css = item[1];
            var media = item[2];
            var sourceMap = item[3];
            var part = { css: css, media: media, sourceMap: sourceMap };

            if (!newStyles[id])
              styles.push((newStyles[id] = { id: id, parts: [part] }));
            else newStyles[id].parts.push(part);
          }

          return styles;
        }

        function insertStyleElement(options, style) {
          var target = getElement(options.insertInto);

          if (!target) {
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.",
            );
          }

          var lastStyleElementInsertedAtTop =
            stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

          if (options.insertAt === 'top') {
            if (!lastStyleElementInsertedAtTop) {
              target.insertBefore(style, target.firstChild);
            } else if (lastStyleElementInsertedAtTop.nextSibling) {
              target.insertBefore(
                style,
                lastStyleElementInsertedAtTop.nextSibling,
              );
            } else {
              target.appendChild(style);
            }
            stylesInsertedAtTop.push(style);
          } else if (options.insertAt === 'bottom') {
            target.appendChild(style);
          } else if (
            typeof options.insertAt === 'object' &&
            options.insertAt.before
          ) {
            var nextSibling = getElement(options.insertAt.before, target);
            target.insertBefore(style, nextSibling);
          } else {
            throw new Error(
              "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n",
            );
          }
        }

        function removeStyleElement(style) {
          if (style.parentNode === null) return false;
          style.parentNode.removeChild(style);

          var idx = stylesInsertedAtTop.indexOf(style);
          if (idx >= 0) {
            stylesInsertedAtTop.splice(idx, 1);
          }
        }

        function createStyleElement(options) {
          var style = document.createElement('style');

          if (options.attrs.type === undefined) {
            options.attrs.type = 'text/css';
          }

          if (options.attrs.nonce === undefined) {
            var nonce = getNonce();
            if (nonce) {
              options.attrs.nonce = nonce;
            }
          }

          addAttrs(style, options.attrs);
          insertStyleElement(options, style);

          return style;
        }

        function createLinkElement(options) {
          var link = document.createElement('link');

          if (options.attrs.type === undefined) {
            options.attrs.type = 'text/css';
          }
          options.attrs.rel = 'stylesheet';

          addAttrs(link, options.attrs);
          insertStyleElement(options, link);

          return link;
        }

        function addAttrs(el, attrs) {
          Object.keys(attrs).forEach(function(key) {
            el.setAttribute(key, attrs[key]);
          });
        }

        function getNonce() {
          if (false) {
          }

          return __webpack_require__.nc;
        }

        function addStyle(obj, options) {
          var style, update, remove, result;

          // If a transform function was defined, run it on the css
          if (options.transform && obj.css) {
            result =
              typeof options.transform === 'function'
                ? options.transform(obj.css)
                : options.transform.default(obj.css);

            if (result) {
              // If transform returns a value, use that instead of the original css.
              // This allows running runtime transformations on the css.
              obj.css = result;
            } else {
              // If the transform function returns a falsy value, don't add this css.
              // This allows conditional loading of css
              return function() {
                // noop
              };
            }
          }

          if (options.singleton) {
            var styleIndex = singletonCounter++;

            style = singleton || (singleton = createStyleElement(options));

            update = applyToSingletonTag.bind(null, style, styleIndex, false);
            remove = applyToSingletonTag.bind(null, style, styleIndex, true);
          } else if (
            obj.sourceMap &&
            typeof URL === 'function' &&
            typeof URL.createObjectURL === 'function' &&
            typeof URL.revokeObjectURL === 'function' &&
            typeof Blob === 'function' &&
            typeof btoa === 'function'
          ) {
            style = createLinkElement(options);
            update = updateLink.bind(null, style, options);
            remove = function() {
              removeStyleElement(style);

              if (style.href) URL.revokeObjectURL(style.href);
            };
          } else {
            style = createStyleElement(options);
            update = applyToTag.bind(null, style);
            remove = function() {
              removeStyleElement(style);
            };
          }

          update(obj);

          return function updateStyle(newObj) {
            if (newObj) {
              if (
                newObj.css === obj.css &&
                newObj.media === obj.media &&
                newObj.sourceMap === obj.sourceMap
              ) {
                return;
              }

              update((obj = newObj));
            } else {
              remove();
            }
          };
        }

        var replaceText = (function() {
          var textStore = [];

          return function(index, replacement) {
            textStore[index] = replacement;

            return textStore.filter(Boolean).join('\n');
          };
        })();

        function applyToSingletonTag(style, index, remove, obj) {
          var css = remove ? '' : obj.css;

          if (style.styleSheet) {
            style.styleSheet.cssText = replaceText(index, css);
          } else {
            var cssNode = document.createTextNode(css);
            var childNodes = style.childNodes;

            if (childNodes[index]) style.removeChild(childNodes[index]);

            if (childNodes.length) {
              style.insertBefore(cssNode, childNodes[index]);
            } else {
              style.appendChild(cssNode);
            }
          }
        }

        function applyToTag(style, obj) {
          var css = obj.css;
          var media = obj.media;

          if (media) {
            style.setAttribute('media', media);
          }

          if (style.styleSheet) {
            style.styleSheet.cssText = css;
          } else {
            while (style.firstChild) {
              style.removeChild(style.firstChild);
            }

            style.appendChild(document.createTextNode(css));
          }
        }

        function updateLink(link, options, obj) {
          var css = obj.css;
          var sourceMap = obj.sourceMap;

          /*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
          var autoFixUrls =
            options.convertToAbsoluteUrls === undefined && sourceMap;

          if (options.convertToAbsoluteUrls || autoFixUrls) {
            css = fixUrls(css);
          }

          if (sourceMap) {
            // http://stackoverflow.com/a/26603875
            css +=
              '\n/*# sourceMappingURL=data:application/json;base64,' +
              btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
              ' */';
          }

          var blob = new Blob([css], { type: 'text/css' });

          var oldSrc = link.href;

          link.href = URL.createObjectURL(blob);

          if (oldSrc) URL.revokeObjectURL(oldSrc);
        }

        /***/
      },

    /***/ './node_modules/style-loader/lib/urls.js':
      /*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        /**
         * When source maps are enabled, `style-loader` uses a link element with a data-uri to
         * embed the css on the page. This breaks all relative urls because now they are relative to a
         * bundle instead of the current page.
         *
         * One solution is to only use full urls, but that may be impossible.
         *
         * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
         *
         * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
         *
         */

        module.exports = function(css) {
          // get current location
          var location = typeof window !== 'undefined' && window.location;

          if (!location) {
            throw new Error('fixUrls requires window.location');
          }

          // blank or null?
          if (!css || typeof css !== 'string') {
            return css;
          }

          var baseUrl = location.protocol + '//' + location.host;
          var currentDir =
            baseUrl + location.pathname.replace(/\/[^\/]*$/, '/');

          // convert each url(...)
          /*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
          var fixedCss = css.replace(
            /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
            function(fullMatch, origUrl) {
              // strip quotes (if they exist)
              var unquotedOrigUrl = origUrl
                .trim()
                .replace(/^"(.*)"$/, function(o, $1) {
                  return $1;
                })
                .replace(/^'(.*)'$/, function(o, $1) {
                  return $1;
                });

              // already a full url? no change
              if (
                /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(
                  unquotedOrigUrl,
                )
              ) {
                return fullMatch;
              }

              // convert the url to a full url
              var newUrl;

              if (unquotedOrigUrl.indexOf('//') === 0) {
                //TODO: should we add protocol?
                newUrl = unquotedOrigUrl;
              } else if (unquotedOrigUrl.indexOf('/') === 0) {
                // path should be relative to the base url
                newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
              } else {
                // path should be relative to current directory
                newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ''); // Strip leading './'
              }

              // send back the fixed url(...)
              return 'url(' + JSON.stringify(newUrl) + ')';
            },
          );

          // send back the fixed css
          return fixedCss;
        };

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Bold.ttf':
      /*!*********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Bold.ttf ***!
  \*********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/37d8997449ad26dbd360a0cd7eef455a.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Bold.woff':
      /*!**********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Bold.woff ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/0ebd7262282fb3e3b21f104b50da512d.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Bold.woff2':
      /*!***********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Bold.woff2 ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/9b607dcde48a10deccec152be60a299a.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldItalic.ttf':
      /*!***************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldItalic.ttf ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/25e3d7f10c47f68e1f3800768c6c572c.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldItalic.woff':
      /*!****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldItalic.woff ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/b72519cc49a2405f2f0d2aeb66e10bde.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldItalic.woff2':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldItalic.woff2 ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/012fce3afa6027430a1333e6e824f078.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacy.ttf':
      /*!***************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacy.ttf ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/715bb379abfdee3e3b0667499ba12835.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacy.woff':
      /*!****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacy.woff ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/9f6cc720858f3747e4082508ffbc1106.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacy.woff2':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacy.woff2 ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/8678fb7d3512c0654aeae12760e3b2e4.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.ttf':
      /*!*********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacyItalic.ttf ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/913d71694994781e7c8f1c85dcf09175.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff':
      /*!**********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/4977f8d745e03f9a723737eaafc8e87b.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff2':
      /*!***********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-BoldLegacyItalic.woff2 ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/30112dbfb0ec2779392cc05c9ee67686.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Italic.ttf':
      /*!***********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Italic.ttf ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/d90d740ea13f710db0707f6a0f246d99.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Italic.woff':
      /*!************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Italic.woff ***!
  \************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/19c9d23827a35b31181ee6260ebc38e2.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Italic.woff2':
      /*!*************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Italic.woff2 ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/96a17ec8f34340deba956832a990f868.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LegacyItalic.ttf':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LegacyItalic.ttf ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/c2c2dbcbe9dca3718677738fc37d2631.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LegacyItalic.woff':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LegacyItalic.woff ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/905e6e333c20eb9363f47657270ba031.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LegacyItalic.woff2':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LegacyItalic.woff2 ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/9dc02a5305075216592a128c49478b46.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Light.ttf':
      /*!**********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Light.ttf ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/dad54e38c5bcfd0094054d9e78fc1ebd.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Light.woff':
      /*!***********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Light.woff ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/0d28d37da01131ba1f588945a61a0387.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Light.woff2':
      /*!************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Light.woff2 ***!
  \************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/4e021175861cd0536cbd14b620d68d80.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightItalic.ttf':
      /*!****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightItalic.ttf ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/2f556c2be1a03e36b67f7457317d94b5.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightItalic.woff':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightItalic.woff ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/27adbfa6aa553d2251a06c96af92826d.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightItalic.woff2':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightItalic.woff2 ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/b5c3a5f21b1a872e9e2f5f49917438f9.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacy.ttf':
      /*!****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacy.ttf ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/f07a3a55b86510359e305e996885ba62.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacy.woff':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacy.woff ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/b2ce6374f86302e0352676f80b1d5b5e.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacy.woff2':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacy.woff2 ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/fa0a31026e2942ed816385a1f149af84.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacyItalic.ttf':
      /*!**********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacyItalic.ttf ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/6ffa81e6f8cba7fec56160dde9f096d5.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacyItalic.woff':
      /*!***********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacyItalic.woff ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/cd8bf8598e31ee48a04b30933057c849.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-LightLegacyItalic.woff2':
      /*!************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-LightLegacyItalic.woff2 ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/d3726cc50ebb103458bd62be8b65ce6f.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Medium.ttf':
      /*!***********************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Medium.ttf ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/4d47f9af5f9ed1d3937ec1de34570097.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Medium.woff':
      /*!************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Medium.woff ***!
  \************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/ac4362a670864c6d1c70d3775adfff1c.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Medium.woff2':
      /*!*************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Medium.woff2 ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/4e12cbe8fe066565186886e27f605e66.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumItalic.ttf':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumItalic.ttf ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/046831f46e8d2eaf68a3c80e63ba3749.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumItalic.woff':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumItalic.woff ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/034334e95cb48b0e663ac63e4955740d.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumItalic.woff2':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumItalic.woff2 ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/b5bd11600dfdeab26ebbc6b26685779e.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacy.ttf':
      /*!*****************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacy.ttf ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/dbaffdea93224be4de360b5c00f3ee95.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacy.woff':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacy.woff ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/72eef72e8b6ecd9754f3bc82d0ffdad9.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacy.woff2':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacy.woff2 ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/fa6b9e65a864369a49e7240f36ef4ae5.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.ttf':
      /*!***********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacyItalic.ttf ***!
  \***********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/166533925d139965f1a427be9bf7fa3b.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff':
      /*!************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/fe112a831ad7c569949fb31bfe80d3c2.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff2':
      /*!*************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-MediumLegacyItalic.woff2 ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/9dea6d97146744a76e3cf46b83555a4b.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Regular.ttf':
      /*!************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Regular.ttf ***!
  \************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/555cf54bb6e3382cf7e5364363e43d9a.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Regular.woff':
      /*!*************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Regular.woff ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/f6b0066cdc42ed7d04ada4aaf15def9f.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-Regular.woff2':
      /*!**************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-Regular.woff2 ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/2ff28b1dab43806e8d4ecfff67eba377.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-RegularLegacy.ttf':
      /*!******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-RegularLegacy.ttf ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/3de052e8dc310e3b6e1d1fe7563cfcdc.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-RegularLegacy.woff':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-RegularLegacy.woff ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/90ded8dd5ead31ccf779d8660346ad25.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-RegularLegacy.woff2':
      /*!********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-RegularLegacy.woff2 ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/7c4cfee31b799d450b2ed9e85937c154.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBold.ttf':
      /*!*************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBold.ttf ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/74c3aa44d21a707408cfb069fe71ec7b.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBold.woff':
      /*!**************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBold.woff ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/42b84132a5a6c5b9cce6ef33b6e6228d.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBold.woff2':
      /*!***************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBold.woff2 ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/b5fc469a3d6c0a9fac282ab01d12265c.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldItalic.ttf':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldItalic.ttf ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/2306397024d24580792f13441cc5dc05.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldItalic.woff':
      /*!********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldItalic.woff ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/3dc487efc962af5c7f08a5420daa51c2.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldItalic.woff2':
      /*!*********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldItalic.woff2 ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/7625a2deccb1c4eb66c09bddd5692a1d.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.ttf':
      /*!*******************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacy.ttf ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/510e3b82dcb380c41094f1208e1e5b70.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff':
      /*!********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/35f8d30cdadbbb0a7d0f86eceea9cf4f.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff2':
      /*!*********************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacy.woff2 ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/c8a7da7b85c4c2beb7999ade1d7f0978.woff2';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.ttf':
      /*!*************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.ttf ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/51d95d4b3e62549a516684b6149c704e.ttf';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff':
      /*!**************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff ***!
  \**************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p + 'fonts/3b48101059866ebd0ac4f8bdacb39c03.woff';

        /***/
      },

    /***/ './src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff2':
      /*!***************************************************************!*\
  !*** ./src/assets/fonts/HKGrotesk-SemiBoldLegacyItalic.woff2 ***!
  \***************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          __webpack_require__.p +
          'fonts/4d24b18d3144400c52978459cd68b05e.woff2';

        /***/
      },

    /***/ './src/config/config.js':
      /*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ../styles/variables.scss */ './src/styles/variables.scss',
        );
        /* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          _styles_variables_scss__WEBPACK_IMPORTED_MODULE_0__,
        );
        /* harmony import */ var _styles_imports_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../styles/imports.scss */ './src/styles/imports.scss',
        );
        /* harmony import */ var _styles_imports_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          _styles_imports_scss__WEBPACK_IMPORTED_MODULE_1__,
        );
        /* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../styles/global.scss */ './src/styles/global.scss',
        );
        /* harmony import */ var _styles_global_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
          _styles_global_scss__WEBPACK_IMPORTED_MODULE_2__,
        );
        /* harmony import */ var _styles_fonts_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ../styles/fonts.css */ './src/styles/fonts.css',
        );
        /* harmony import */ var _styles_fonts_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
          _styles_fonts_css__WEBPACK_IMPORTED_MODULE_3__,
        );

        // require('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true');

        /***/
      },

    /***/ './src/styles/fonts.css':
      /*!******************************!*\
  !*** ./src/styles/fonts.css ***!
  \******************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var content = __webpack_require__(
          /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./fonts.css */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/fonts.css',
        );

        if (typeof content === 'string') content = [[module.i, content, '']];

        var transform;
        var insertInto;

        var options = { hmr: true };

        options.transform = transform;
        options.insertInto = undefined;

        var update = __webpack_require__(
          /*! ../../node_modules/style-loader/lib/addStyles.js */ './node_modules/style-loader/lib/addStyles.js',
        )(content, options);

        if (content.locals) module.exports = content.locals;

        if (true) {
          module.hot.accept(
            /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./fonts.css */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/fonts.css',
            function() {
              var newContent = __webpack_require__(
                /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./fonts.css */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/fonts.css',
              );

              if (typeof newContent === 'string')
                newContent = [[module.i, newContent, '']];

              var locals = (function(a, b) {
                var key,
                  idx = 0;

                for (key in a) {
                  if (!b || a[key] !== b[key]) return false;
                  idx++;
                }

                for (key in b) idx--;

                return idx === 0;
              })(content.locals, newContent.locals);

              if (!locals)
                throw new Error(
                  'Aborting CSS HMR due to changed css-modules locals.',
                );

              update(newContent);
            },
          );

          module.hot.dispose(function() {
            update();
          });
        }

        /***/
      },

    /***/ './src/styles/global.scss':
      /*!********************************!*\
  !*** ./src/styles/global.scss ***!
  \********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var content = __webpack_require__(
          /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./global.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/global.scss',
        );

        if (typeof content === 'string') content = [[module.i, content, '']];

        var transform;
        var insertInto;

        var options = { hmr: true };

        options.transform = transform;
        options.insertInto = undefined;

        var update = __webpack_require__(
          /*! ../../node_modules/style-loader/lib/addStyles.js */ './node_modules/style-loader/lib/addStyles.js',
        )(content, options);

        if (content.locals) module.exports = content.locals;

        if (true) {
          module.hot.accept(
            /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./global.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/global.scss',
            function() {
              var newContent = __webpack_require__(
                /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./global.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/global.scss',
              );

              if (typeof newContent === 'string')
                newContent = [[module.i, newContent, '']];

              var locals = (function(a, b) {
                var key,
                  idx = 0;

                for (key in a) {
                  if (!b || a[key] !== b[key]) return false;
                  idx++;
                }

                for (key in b) idx--;

                return idx === 0;
              })(content.locals, newContent.locals);

              if (!locals)
                throw new Error(
                  'Aborting CSS HMR due to changed css-modules locals.',
                );

              update(newContent);
            },
          );

          module.hot.dispose(function() {
            update();
          });
        }

        /***/
      },

    /***/ './src/styles/imports.scss':
      /*!*********************************!*\
  !*** ./src/styles/imports.scss ***!
  \*********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var content = __webpack_require__(
          /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./imports.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/imports.scss',
        );

        if (typeof content === 'string') content = [[module.i, content, '']];

        var transform;
        var insertInto;

        var options = { hmr: true };

        options.transform = transform;
        options.insertInto = undefined;

        var update = __webpack_require__(
          /*! ../../node_modules/style-loader/lib/addStyles.js */ './node_modules/style-loader/lib/addStyles.js',
        )(content, options);

        if (content.locals) module.exports = content.locals;

        if (true) {
          module.hot.accept(
            /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./imports.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/imports.scss',
            function() {
              var newContent = __webpack_require__(
                /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./imports.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/imports.scss',
              );

              if (typeof newContent === 'string')
                newContent = [[module.i, newContent, '']];

              var locals = (function(a, b) {
                var key,
                  idx = 0;

                for (key in a) {
                  if (!b || a[key] !== b[key]) return false;
                  idx++;
                }

                for (key in b) idx--;

                return idx === 0;
              })(content.locals, newContent.locals);

              if (!locals)
                throw new Error(
                  'Aborting CSS HMR due to changed css-modules locals.',
                );

              update(newContent);
            },
          );

          module.hot.dispose(function() {
            update();
          });
        }

        /***/
      },

    /***/ './src/styles/variables.scss':
      /*!***********************************!*\
  !*** ./src/styles/variables.scss ***!
  \***********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var content = __webpack_require__(
          /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./variables.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/variables.scss',
        );

        if (typeof content === 'string') content = [[module.i, content, '']];

        var transform;
        var insertInto;

        var options = { hmr: true };

        options.transform = transform;
        options.insertInto = undefined;

        var update = __webpack_require__(
          /*! ../../node_modules/style-loader/lib/addStyles.js */ './node_modules/style-loader/lib/addStyles.js',
        )(content, options);

        if (content.locals) module.exports = content.locals;

        if (true) {
          module.hot.accept(
            /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./variables.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/variables.scss',
            function() {
              var newContent = __webpack_require__(
                /*! !../../node_modules/css-loader??ref--9-1!../../node_modules/sass-loader/lib/loader.js??ref--9-2!../../node_modules/sass-resources-loader/lib/loader.js??ref--9-3!./variables.scss */ './node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/sass-resources-loader/lib/loader.js?!./src/styles/variables.scss',
              );

              if (typeof newContent === 'string')
                newContent = [[module.i, newContent, '']];

              var locals = (function(a, b) {
                var key,
                  idx = 0;

                for (key in a) {
                  if (!b || a[key] !== b[key]) return false;
                  idx++;
                }

                for (key in b) idx--;

                return idx === 0;
              })(content.locals, newContent.locals);

              if (!locals)
                throw new Error(
                  'Aborting CSS HMR due to changed css-modules locals.',
                );

              update(newContent);
            },
          );

          module.hot.dispose(function() {
            update();
          });
        }

        /***/
      },

    /******/
  },
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9mb250cy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9nbG9iYWwuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2ltcG9ydHMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkLnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkLndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkSXRhbGljLnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkSXRhbGljLndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZEl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5LnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5LndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5SXRhbGljLnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5SXRhbGljLndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1JdGFsaWMudHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MZWdhY3lJdGFsaWMudHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxlZ2FjeUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxlZ2FjeUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodC50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHQud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodEl0YWxpYy50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodEl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeS50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3kud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3lJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW0udHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bS53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1JdGFsaWMudHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3kudHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUxlZ2FjeS53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUxlZ2FjeS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3lJdGFsaWMudHRmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUxlZ2FjeUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUxlZ2FjeUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyLnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyLndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stUmVndWxhci53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyTGVnYWN5LnR0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyTGVnYWN5LndvZmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stUmVndWxhckxlZ2FjeS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZC50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGQud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZEl0YWxpYy50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGRJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZEl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeS50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGRMZWdhY3kud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeS53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGRMZWdhY3lJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2ZvbnRzLmNzcz82MDBlIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvZ2xvYmFsLnNjc3M/M2UxOCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2ltcG9ydHMuc2Nzcz85YmI2Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvdmFyaWFibGVzLnNjc3M/MmZhOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztB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QUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtB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LGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsZ0Q7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsaUQ7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsa0Q7Ozs7Ozs7Ozs7OztBQ0F4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Q0FHQSwwRjs7Ozs7Ozs7Ozs7O0FDSkEsY0FBYyxtQkFBTyxDQUFDLDhVQUF3TDs7QUFFOU0sNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDhVQUF3TDtBQUMzTSxtQkFBbUIsbUJBQU8sQ0FBQyw4VUFBd0w7O0FBRW5OLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLGtWQUEwTDs7QUFFaE4sNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGtWQUEwTDtBQUM3TSxtQkFBbUIsbUJBQU8sQ0FBQyxrVkFBMEw7O0FBRXJOLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLG9WQUEyTDs7QUFFak4sNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLG9WQUEyTDtBQUM5TSxtQkFBbUIsbUJBQU8sQ0FBQyxvVkFBMkw7O0FBRXROLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7QUMzQ0EsY0FBYyxtQkFBTyxDQUFDLHdWQUE2TDs7QUFFbk4sNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHdWQUE2TDtBQUNoTixtQkFBbUIsbUJBQU8sQ0FBQyx3VkFBNkw7O0FBRXhOLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJlN2E2ZTdmNGU2Y2JiNTNmMmE3OVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJjb25maWdcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZTdhNmU3ZjRlNmNiYjUzZjJhNzlcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiY29uZmlnXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2NvbmZpZy9jb25maWcuanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb25maWcvY29uZmlnLmpzXCIpO1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY3ZmM7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tdG9wOiA3MHB4O1xcbiAgcGFkZGluZzogNDBweCAwIDA7IH1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgY29sb3I6ICM1NTU7XFxuICB3b3JkLXNwYWNpbmc6IDJweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7IH1cXG5cXG5wOjpzZWxlY3Rpb24sIGgxOjpzZWxlY3Rpb24sIGgyOjpzZWxlY3Rpb24sIGgzOjpzZWxlY3Rpb24sIGg0OjpzZWxlY3Rpb24sIGg1OjpzZWxlY3Rpb24sIGg2OjpzZWxlY3Rpb24sIGE6OnNlbGVjdGlvbiwgc3Bhbjo6c2VsZWN0aW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyZjM1NDI7XFxuICBjb2xvcjogI2ZmZjsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XFxuICAgIHA6OnNlbGVjdGlvbiwgaDE6OnNlbGVjdGlvbiwgaDI6OnNlbGVjdGlvbiwgaDM6OnNlbGVjdGlvbiwgaDQ6OnNlbGVjdGlvbiwgaDU6OnNlbGVjdGlvbiwgaDY6OnNlbGVjdGlvbiwgYTo6c2VsZWN0aW9uLCBzcGFuOjpzZWxlY3Rpb24ge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgY29sb3I6ICMyZjM1NDI7IH0gfVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7IH1cXG4gIGEgcCxcXG4gIGEgaDEsXFxuICBhIGgyLFxcbiAgYSBoMyxcXG4gIGEgaDQsXFxuICBhIGg1LFxcbiAgYSBoNixcXG4gIGEgYSxcXG4gIGEgc3BhbiB7XFxuICAgIGNvbG9yOiAjMmYzNTQyOyB9XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAxOyB9XFxuXFxuYnV0dG9uOmFjdGl2ZSwgYnV0dG9uOmZvY3VzIHtcXG4gIG91dGxpbmU6IDAgIWltcG9ydGFudDsgfVxcblxcbmJsb2NrcXVvdGUge1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E0YjBiZTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtc2l6ZTogMTMuNXB4OyB9XFxuICBibG9ja3F1b3RlIHAge1xcbiAgICBtYXJnaW4tYm90dG9tOiAwOyB9XFxuXFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuXFxuLmdpZl9wbGF5ZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4uZ2lmX3BsYXllciAucGxheV9idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyOiAycHggZGFzaGVkIHJnYmEoMjI1LCAyMjUsIDIyNSwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxlZnQ6IDUwJTtcXG4gIG9wYWNpdHk6IDE7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cywgb3BhY2l0eSAwLjRzO1xcbiAgei1pbmRleDogMTsgfVxcblxcbi5naWZfcGxheWVyIC5wbGF5X2J1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjcpOyB9XFxuXFxuLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiR0lGXFxcIjsgfVxcblxcbi5naWZfcGxheWVyLnBsYXlpbmcgLnBsYXlfYnV0dG9uIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApIHJvdGF0ZSgxODBkZWcpO1xcbiAgb3BhY2l0eTogMC41OyB9XFxuXFxuLnRhZyB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZjNmZjtcXG4gIGNvbG9yOiAjMmE4NWZlO1xcbiAgcGFkZGluZzogMHB4IDRweDtcXG4gIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDsgfVxcblxcbmFiYixcXG5hY3JvbnltIHtcXG4gIGN1cnNvcjogaGVscDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyZjdkZWI7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXIud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXIud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0SXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodEl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0SXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtSXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGQud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bS53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stSXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stSXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkSXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkSXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZEl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkSXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0LnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIE1lZGl1bSBMZWdhY3knO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtTGVnYWN5LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3kud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3kudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2sgU2VtaUJvbGQgTGVnYWN5JztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkTGVnYWN5LndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkTGVnYWN5LnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIE1lZGl1bSBMZWdhY3knO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtTGVnYWN5SXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3lJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3lJdGFsaWMudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2sgTGVnYWN5JztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxlZ2FjeUl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGVnYWN5SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGVnYWN5SXRhbGljLnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIExpZ2h0IExlZ2FjeSc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3lJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMaWdodCBMZWdhY3knO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3kud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0TGVnYWN5LndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3kudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2sgU21Cb2xkIExlZ2FjeSc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGRMZWdhY3lJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMZWdhY3knO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeS53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeS53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRMZWdhY3kudHRmXCIpKSArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2sgTGVnYWN5JztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXJMZWdhY3kud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXJMZWdhY3kud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyTGVnYWN5LnR0ZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIExlZ2FjeSc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5SXRhbGljLndvZmYyXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkTGVnYWN5SXRhbGljLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeUl0YWxpYy50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3ZpcmdpbmlhdmVsYXNxdWV6c290by9GdWxsU3RhY2svTWFya2VyUGluaW5hL3NyYy9zdHlsZXMvc3JjL3N0eWxlcy9mb250cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBU0E7RUFDRSwwQkFBeUI7RUFDekIsaURBQWdEO0VBQ2hELGlCQUFnQjtFQUNoQixrQkFBaUIsRUFDbEI7O0FBQ0Q7RUFDRSxrQkFBaUI7RUFDakIsWUFBVztFQUNYLGtCQUFpQjtFQUNqQixpQkFBZ0IsRUFDakI7O0FBQ0Q7RUFFSSwwQkF2Qlc7RUF3QlgsWUFBVyxFQUtaO0VBSkM7SUFKSjtNQUtNLHVCQUFzQjtNQUN0QixlQTNCUyxFQTZCWixFQUFBOztBQUVIO0VBQ0UsaUNBQWdDLEVBWWpDO0VBYkQ7Ozs7Ozs7OztJQVdJLGVBMUNXLEVBMkNaOztBQUVIOzs7Ozs7RUFNRSxpQkFBZ0I7RUFDaEIsa0JBQWlCLEVBQ2xCOztBQUNEO0VBR0csc0JBQXFCLEVBQ3JCOztBQUVIO0VBQ0UsbUJBQWtCO0VBQ2xCLDBCQTdEa0I7RUE4RGxCLG1CQUFrQjtFQUNsQixrQkFBaUIsRUFJbEI7RUFSRDtJQU1JLGlCQUFnQixFQUNqQjs7QUFFSDtFQUNFLG9CQUFtQixFQUNwQjs7QUFDRDtFQUVJLHNCQUFxQjtFQUNyQixtQkFBa0I7RUFDbEIsMEJBQXlCO0VBQ3pCLHVCQUFzQjtFQUN0QixzQkFBcUI7RUFDckIsa0JBQWlCO0VBQ2pCLDRCQUEyQjtFQUMzQix5Q0FBd0MsRUFDekM7O0FBVkg7RUFhSSxxQ0FBb0M7RUFDcEMsNENBQTBDO0VBQzFDLG1CQUFrQjtFQUNsQix5Q0FBd0M7RUFDeEMsWUFBVztFQUNYLGdCQUFlO0VBQ2YsZ0JBQWU7RUFDZixVQUFTO0VBQ1QsV0FBVTtFQUNWLGNBQWE7RUFDYixtQkFBa0I7RUFDbEIsU0FBUTtFQUNSLHVEQUFzRDtFQUN0RCx5Q0FBd0M7RUFDeEMsV0FBVSxFQUNYOztBQTVCSDtFQStCSSxxQ0FBb0M7RUFDcEMseUNBQXdDLEVBQ3pDOztBQWpDSDtFQW9DSSxlQUFjLEVBQ2Y7O0FBckNIO0VBd0NJLHlEQUF3RDtFQUN4RCxhQUFZLEVBQ2I7O0FBRUg7RUFFSSxpQkFBZ0I7RUFDaEIsZ0JBQWU7RUFDZixtQkFBa0I7RUFDbEIsMEJBQXlCO0VBQ3pCLGVBQWM7RUFDZCxpQkFBZ0I7RUFDaEIsNEJBQTJCLEVBQzVCOztBQUVIOztFQUVFLGFBQVk7RUFDWiwwQkEzSFk7RUE0SFosWUFBVztFQUNYLGdCQUFlO0VBQ2YsYUFBWTtFQUNaLG1CQUFrQixFQUNuQjs7QUFNRDtFQUNFLDBCQUF5QjtFQUN6QixtSkFFaUU7RUFDakUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixtSkFFcUU7RUFDckUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixtSkFFc0U7RUFDdEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixxSkFFOEQ7RUFDOUQsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFZ0U7RUFDaEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFZ0U7RUFDaEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFa0U7RUFDbEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFb0U7RUFDcEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFd0U7RUFDeEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUF5QjtFQUN6QixzSkFFK0Q7RUFDL0QsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLHdDQUF1QztFQUN2QyxzSkFFc0U7RUFDdEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLDBDQUF5QztFQUN6QyxzSkFFd0U7RUFDeEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLHdDQUF1QztFQUN2QyxzSkFFNEU7RUFDNUUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLGlDQUFnQztFQUNoQyxzSkFFc0U7RUFDdEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLHVDQUFzQztFQUN0QyxzSkFFMkU7RUFDM0UsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLHVDQUFzQztFQUN0QyxzSkFFcUU7RUFDckUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLHdDQUF1QztFQUN2QyxzSkFHOEU7RUFDOUUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLGlDQUFnQztFQUNoQyxzSkFFb0U7RUFDcEUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUVwQjtFQUNFLGlDQUFnQztFQUNoQyxzSkFFdUU7RUFDdkUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBOztBQUdwQjtFQUNFLGlDQUFnQztFQUNoQyxzSkFFMEU7RUFDMUUsaUJBQWdCO0VBQ2hCLG1CQUFrQixFQUFBXCIsXCJmaWxlXCI6XCJmb250cy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiJGJsYWNrOiAjMmYzNTQyO1xcbiRncmF5X2xpZ2h0OiAjYTRiMGJlO1xcbiRncmF5X21lZGl1bTogIzc0N2Q4YztcXG4kZ3JheV9kYXJrOiAjNTc2MDZmO1xcbiR3cml0ZV9ncmF5XzE6ICNmMWYyZjY7XFxuJHdyaXRlX2dyYXlfMjogI2RmZTRlYTtcXG4kd3JpdGVfZ3JheV8zOiAjY2VkNmUwO1xcbiRibHVlOiAjMmY3ZGViO1xcbiRibHVlX21lZGl1bTogIzFiNGVkNTtcXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY3ZmM7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tdG9wOiA3MHB4O1xcbiAgcGFkZGluZzogNDBweCAwIDA7XFxufVxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBjb2xvcjogIzU1NTtcXG4gIHdvcmQtc3BhY2luZzogMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxucCwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgYSwgc3BhbiB7XFxuICAmOjpzZWxlY3Rpb24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgIGNvbG9yOiAkYmxhY2s7XFxuICAgIH1cXG4gIH1cXG59XFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcXG4gIHAsXFxuICBoMSxcXG4gIGgyLFxcbiAgaDMsXFxuICBoNCxcXG4gIGg1LFxcbiAgaDYsXFxuICBhLFxcbiAgc3BhbiB7XFxuICAgIGNvbG9yOiAkYmxhY2s7XFxuICB9XFxufVxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LCB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDE7XFxufVxcbmJ1dHRvbiB7XFxuICAmOmFjdGl2ZSxcXG4gICY6Zm9jdXMge1xcbiAgIG91dGxpbmU6IDAgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheV9saWdodDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuOmdsb2JhbCB7XFxuICAuZ2lmX3BsYXllciB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGJvcmRlcjogMnB4IGRhc2hlZCByZ2JhKDIyNSwyMjUsIDIyNSwgMC41KTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgcGFkZGluZzogMTRweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cywgb3BhY2l0eSAwLjRzO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJHSUZcXFwiO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIucGxheWluZyAucGxheV9idXR0b24ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgb3BhY2l0eTogMC41O1xcbiAgfVxcbn1cXG46Z2xvYmFsIHtcXG4gIC50YWcge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZjNmZjtcXG4gICAgY29sb3I6ICMyYTg1ZmU7XFxuICAgIHBhZGRpbmc6IDBweCA0cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuYWJiLFxcbmFjcm9ueW0ge1xcbiAgY3Vyc29yOiBoZWxwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJsdWU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuJWJveFdyYXBwZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXIudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRJdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodEl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodEl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1JdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1JdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1Cb2xkLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bS50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1JdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1JdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGQud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stU2VtaUJvbGQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZEl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRJdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZEl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZEl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkSXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxpZ2h0LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHQud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2sgTWVkaXVtIExlZ2FjeSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3kud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1NZWRpdW1MZWdhY3kud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtTGVnYWN5LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIFNlbWlCb2xkIExlZ2FjeSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeS53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkTGVnYWN5LndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkTGVnYWN5LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrIE1lZGl1bSBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtTGVnYWN5SXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTWVkaXVtTGVnYWN5SXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLU1lZGl1bUxlZ2FjeUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGVnYWN5SXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGVnYWN5SXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUxlZ2FjeUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMaWdodCBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3lJdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMaWdodCBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stTGlnaHRMZWdhY3kud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeS53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1MaWdodExlZ2FjeS50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBTbUJvbGQgTGVnYWN5JztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVNlbWlCb2xkTGVnYWN5SXRhbGljLndvZmYyJylcXG4gICAgICBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyksXFxuICAgIHVybCgnLi4vYXNzZXRzL2ZvbnRzL0hLR3JvdGVzay1TZW1pQm9sZExlZ2FjeUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeS53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRMZWdhY3kud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeS50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stUmVndWxhckxlZ2FjeS53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLVJlZ3VsYXJMZWdhY3kud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stUmVndWxhckxlZ2FjeS50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzayBMZWdhY3knO1xcbiAgc3JjOiB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeUl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcuLi9hc3NldHMvZm9udHMvSEtHcm90ZXNrLUJvbGRMZWdhY3lJdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJy4uL2Fzc2V0cy9mb250cy9IS0dyb3Rlc2stQm9sZExlZ2FjeUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjdmYztcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzaycsIHNhbnMtc2VyaWYgIWltcG9ydGFudDtcXG4gIG1hcmdpbi10b3A6IDcwcHg7XFxuICBwYWRkaW5nOiA0MHB4IDAgMDsgfVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBjb2xvcjogIzU1NTtcXG4gIHdvcmQtc3BhY2luZzogMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcblxcbnA6OnNlbGVjdGlvbiwgaDE6OnNlbGVjdGlvbiwgaDI6OnNlbGVjdGlvbiwgaDM6OnNlbGVjdGlvbiwgaDQ6OnNlbGVjdGlvbiwgaDU6OnNlbGVjdGlvbiwgaDY6OnNlbGVjdGlvbiwgYTo6c2VsZWN0aW9uLCBzcGFuOjpzZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmMzU0MjtcXG4gIGNvbG9yOiAjZmZmOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcXG4gICAgcDo6c2VsZWN0aW9uLCBoMTo6c2VsZWN0aW9uLCBoMjo6c2VsZWN0aW9uLCBoMzo6c2VsZWN0aW9uLCBoNDo6c2VsZWN0aW9uLCBoNTo6c2VsZWN0aW9uLCBoNjo6c2VsZWN0aW9uLCBhOjpzZWxlY3Rpb24sIHNwYW46OnNlbGVjdGlvbiB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICBjb2xvcjogIzJmMzU0MjsgfSB9XFxuXFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDsgfVxcbiAgYSBwLFxcbiAgYSBoMSxcXG4gIGEgaDIsXFxuICBhIGgzLFxcbiAgYSBoNCxcXG4gIGEgaDUsXFxuICBhIGg2LFxcbiAgYSBhLFxcbiAgYSBzcGFuIHtcXG4gICAgY29sb3I6ICMyZjM1NDI7IH1cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDE7IH1cXG5cXG5idXR0b246YWN0aXZlLCBidXR0b246Zm9jdXMge1xcbiAgb3V0bGluZTogMCAhaW1wb3J0YW50OyB9XFxuXFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTRiMGJlO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAxMy41cHg7IH1cXG4gIGJsb2NrcXVvdGUgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7IH1cXG5cXG4uZ2lmX3BsYXllciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcblxcbi5naWZfcGxheWVyIC5wbGF5X2J1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXI6IDJweCBkYXNoZWQgcmdiYSgyMjUsIDIyNSwgMjI1LCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGVmdDogNTAlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHBhZGRpbmc6IDE0cHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzLCBvcGFjaXR5IDAuNHM7XFxuICB6LWluZGV4OiAxOyB9XFxuXFxuLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNyk7IH1cXG5cXG4uZ2lmX3BsYXllciAucGxheV9idXR0b246OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJHSUZcXFwiOyB9XFxuXFxuLmdpZl9wbGF5ZXIucGxheWluZyAucGxheV9idXR0b24ge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCkgcm90YXRlKDE4MGRlZyk7XFxuICBvcGFjaXR5OiAwLjU7IH1cXG5cXG4udGFnIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVmM2ZmO1xcbiAgY29sb3I6ICMyYTg1ZmU7XFxuICBwYWRkaW5nOiAwcHggNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9XFxuXFxuYWJiLFxcbmFjcm9ueW0ge1xcbiAgY3Vyc29yOiBoZWxwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmN2RlYjtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4OyB9XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmN2ZjO1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXRvcDogNzBweDtcXG4gIHBhZGRpbmc6IDQwcHggMCAwOyB9XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGNvbG9yOiAjNTU1O1xcbiAgd29yZC1zcGFjaW5nOiAycHg7XFxuICBmb250LXdlaWdodDogNDAwOyB9XFxuXFxucDo6c2VsZWN0aW9uLCBoMTo6c2VsZWN0aW9uLCBoMjo6c2VsZWN0aW9uLCBoMzo6c2VsZWN0aW9uLCBoNDo6c2VsZWN0aW9uLCBoNTo6c2VsZWN0aW9uLCBoNjo6c2VsZWN0aW9uLCBhOjpzZWxlY3Rpb24sIHNwYW46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzNTQyO1xcbiAgY29sb3I6ICNmZmY7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcbiAgICBwOjpzZWxlY3Rpb24sIGgxOjpzZWxlY3Rpb24sIGgyOjpzZWxlY3Rpb24sIGgzOjpzZWxlY3Rpb24sIGg0OjpzZWxlY3Rpb24sIGg1OjpzZWxlY3Rpb24sIGg2OjpzZWxlY3Rpb24sIGE6OnNlbGVjdGlvbiwgc3Bhbjo6c2VsZWN0aW9uIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgIGNvbG9yOiAjMmYzNTQyOyB9IH1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50OyB9XFxuICBhIHAsXFxuICBhIGgxLFxcbiAgYSBoMixcXG4gIGEgaDMsXFxuICBhIGg0LFxcbiAgYSBoNSxcXG4gIGEgaDYsXFxuICBhIGEsXFxuICBhIHNwYW4ge1xcbiAgICBjb2xvcjogIzJmMzU0MjsgfVxcblxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMTsgfVxcblxcbmJ1dHRvbjphY3RpdmUsIGJ1dHRvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG5ibG9ja3F1b3RlIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhNGIwYmU7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXNpemU6IDEzLjVweDsgfVxcbiAgYmxvY2txdW90ZSBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcblxcbi5naWZfcGxheWVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXFxuLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlcjogMnB4IGRhc2hlZCByZ2JhKDIyNSwgMjI1LCAyMjUsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY29sb3I6ICNmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBsZWZ0OiA1MCU7XFxuICBvcGFjaXR5OiAxO1xcbiAgcGFkZGluZzogMTRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMsIG9wYWNpdHkgMC40cztcXG4gIHotaW5kZXg6IDE7IH1cXG5cXG4uZ2lmX3BsYXllciAucGxheV9idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC43KTsgfVxcblxcbi5naWZfcGxheWVyIC5wbGF5X2J1dHRvbjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIkdJRlxcXCI7IH1cXG5cXG4uZ2lmX3BsYXllci5wbGF5aW5nIC5wbGF5X2J1dHRvbiB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKSByb3RhdGUoMTgwZGVnKTtcXG4gIG9wYWNpdHk6IDAuNTsgfVxcblxcbi50YWcge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWYzZmY7XFxuICBjb2xvcjogIzJhODVmZTtcXG4gIHBhZGRpbmc6IDBweCA0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG5hYmIsXFxuYWNyb255bSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3ZGViO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiA0cHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3ZpcmdpbmlhdmVsYXNxdWV6c290by9GdWxsU3RhY2svTWFya2VyUGluaW5hL3NyYy9zdHlsZXMvc3JjL3N0eWxlcy9nbG9iYWwuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFTQTtFQUNFLDBCQUF5QjtFQUN6QixpREFBZ0Q7RUFDaEQsaUJBQWdCO0VBQ2hCLGtCQUFpQixFQUNsQjs7QUFDRDtFQUNFLGtCQUFpQjtFQUNqQixZQUFXO0VBQ1gsa0JBQWlCO0VBQ2pCLGlCQUFnQixFQUNqQjs7QUFDRDtFQUVJLDBCQXZCVztFQXdCWCxZQUFXLEVBS1o7RUFKQztJQUpKO01BS00sdUJBQXNCO01BQ3RCLGVBM0JTLEVBNkJaLEVBQUE7O0FBRUg7RUFDRSxpQ0FBZ0MsRUFZakM7RUFiRDs7Ozs7Ozs7O0lBV0ksZUExQ1csRUEyQ1o7O0FBRUg7Ozs7OztFQU1FLGlCQUFnQjtFQUNoQixrQkFBaUIsRUFDbEI7O0FBQ0Q7RUFHRyxzQkFBcUIsRUFDckI7O0FBRUg7RUFDRSxtQkFBa0I7RUFDbEIsMEJBN0RrQjtFQThEbEIsbUJBQWtCO0VBQ2xCLGtCQUFpQixFQUlsQjtFQVJEO0lBTUksaUJBQWdCLEVBQ2pCOztBQUVIO0VBQ0Usb0JBQW1CLEVBQ3BCOztBQUNEO0VBRUksc0JBQXFCO0VBQ3JCLG1CQUFrQjtFQUNsQiwwQkFBeUI7RUFDekIsdUJBQXNCO0VBQ3RCLHNCQUFxQjtFQUNyQixrQkFBaUI7RUFDakIsNEJBQTJCO0VBQzNCLHlDQUF3QyxFQUN6Qzs7QUFWSDtFQWFJLHFDQUFvQztFQUNwQyw0Q0FBMEM7RUFDMUMsbUJBQWtCO0VBQ2xCLHlDQUF3QztFQUN4QyxZQUFXO0VBQ1gsZ0JBQWU7RUFDZixnQkFBZTtFQUNmLFVBQVM7RUFDVCxXQUFVO0VBQ1YsY0FBYTtFQUNiLG1CQUFrQjtFQUNsQixTQUFRO0VBQ1IsdURBQXNEO0VBQ3RELHlDQUF3QztFQUN4QyxXQUFVLEVBQ1g7O0FBNUJIO0VBK0JJLHFDQUFvQztFQUNwQyx5Q0FBd0MsRUFDekM7O0FBakNIO0VBb0NJLGVBQWMsRUFDZjs7QUFyQ0g7RUF3Q0kseURBQXdEO0VBQ3hELGFBQVksRUFDYjs7QUFFSDtFQUVJLGlCQUFnQjtFQUNoQixnQkFBZTtFQUNmLG1CQUFrQjtFQUNsQiwwQkFBeUI7RUFDekIsZUFBYztFQUNkLGlCQUFnQjtFQUNoQiw0QkFBMkIsRUFDNUI7O0FBRUg7O0VBRUUsYUFBWTtFQUNaLDBCQTNIWTtFQTRIWixZQUFXO0VBQ1gsZ0JBQWU7RUFDZixhQUFZO0VBQ1osbUJBQWtCLEVBQ25COztBQU1EO0VBQ0UsMEJBQXlCO0VBQ3pCLGlEQUFnRDtFQUNoRCxpQkFBZ0I7RUFDaEIsa0JBQWlCLEVBQ2xCOztBQUNEO0VBQ0Usa0JBQWlCO0VBQ2pCLFlBQVc7RUFDWCxrQkFBaUI7RUFDakIsaUJBQWdCLEVBQ2pCOztBQUNEO0VBRUksMEJBM0pXO0VBNEpYLFlBQVcsRUFLWjtFQUpDO0lBSko7TUFLTSx1QkFBc0I7TUFDdEIsZUEvSlMsRUFpS1osRUFBQTs7QUFFSDtFQUNFLGlDQUFnQyxFQVlqQztFQWJEOzs7Ozs7Ozs7SUFXSSxlQTlLVyxFQStLWjs7QUFFSDs7Ozs7O0VBTUUsaUJBQWdCO0VBQ2hCLGtCQUFpQixFQUNsQjs7QUFDRDtFQUdHLHNCQUFxQixFQUNyQjs7QUFFSDtFQUNFLG1CQUFrQjtFQUNsQiwwQkFqTWtCO0VBa01sQixtQkFBa0I7RUFDbEIsa0JBQWlCLEVBSWxCO0VBUkQ7SUFNSSxpQkFBZ0IsRUFDakI7O0FBRUg7RUFDRSxvQkFBbUIsRUFDcEI7O0FBQ0Q7RUFFSSxzQkFBcUI7RUFDckIsbUJBQWtCO0VBQ2xCLDBCQUF5QjtFQUN6Qix1QkFBc0I7RUFDdEIsc0JBQXFCO0VBQ3JCLGtCQUFpQjtFQUNqQiw0QkFBMkI7RUFDM0IseUNBQXdDLEVBQ3pDOztBQVZIO0VBYUkscUNBQW9DO0VBQ3BDLDRDQUEwQztFQUMxQyxtQkFBa0I7RUFDbEIseUNBQXdDO0VBQ3hDLFlBQVc7RUFDWCxnQkFBZTtFQUNmLGdCQUFlO0VBQ2YsVUFBUztFQUNULFdBQVU7RUFDVixjQUFhO0VBQ2IsbUJBQWtCO0VBQ2xCLFNBQVE7RUFDUix1REFBc0Q7RUFDdEQseUNBQXdDO0VBQ3hDLFdBQVUsRUFDWDs7QUE1Qkg7RUErQkkscUNBQW9DO0VBQ3BDLHlDQUF3QyxFQUN6Qzs7QUFqQ0g7RUFvQ0ksZUFBYyxFQUNmOztBQXJDSDtFQXdDSSx5REFBd0Q7RUFDeEQsYUFBWSxFQUNiOztBQUVIO0VBRUksaUJBQWdCO0VBQ2hCLGdCQUFlO0VBQ2YsbUJBQWtCO0VBQ2xCLDBCQUF5QjtFQUN6QixlQUFjO0VBQ2QsaUJBQWdCO0VBQ2hCLDRCQUEyQixFQUM1Qjs7QUFFSDs7RUFFRSxhQUFZO0VBQ1osMEJBL1BZO0VBZ1FaLFlBQVc7RUFDWCxnQkFBZTtFQUNmLGFBQVk7RUFDWixtQkFBa0IsRUFDbkJcIixcImZpbGVcIjpcImdsb2JhbC5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiRibGFjazogIzJmMzU0MjtcXG4kZ3JheV9saWdodDogI2E0YjBiZTtcXG4kZ3JheV9tZWRpdW06ICM3NDdkOGM7XFxuJGdyYXlfZGFyazogIzU3NjA2ZjtcXG4kd3JpdGVfZ3JheV8xOiAjZjFmMmY2O1xcbiR3cml0ZV9ncmF5XzI6ICNkZmU0ZWE7XFxuJHdyaXRlX2dyYXlfMzogI2NlZDZlMDtcXG4kYmx1ZTogIzJmN2RlYjtcXG4kYmx1ZV9tZWRpdW06ICMxYjRlZDU7XFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmN2ZjO1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXRvcDogNzBweDtcXG4gIHBhZGRpbmc6IDQwcHggMCAwO1xcbn1cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgY29sb3I6ICM1NTU7XFxuICB3b3JkLXNwYWNpbmc6IDJweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbnAsIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIGEsIHNwYW4ge1xcbiAgJjo6c2VsZWN0aW9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICBjb2xvcjogJGJsYWNrO1xcbiAgICB9XFxuICB9XFxufVxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XFxuICBwLFxcbiAgaDEsXFxuICBoMixcXG4gIGgzLFxcbiAgaDQsXFxuICBoNSxcXG4gIGg2LFxcbiAgYSxcXG4gIHNwYW4ge1xcbiAgICBjb2xvcjogJGJsYWNrO1xcbiAgfVxcbn1cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiwge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAxO1xcbn1cXG5idXR0b24ge1xcbiAgJjphY3RpdmUsXFxuICAmOmZvY3VzIHtcXG4gICBvdXRsaW5lOiAwICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbmJsb2NrcXVvdGUge1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGdyYXlfbGlnaHQ7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXNpemU6IDEzLjVweDtcXG4gIHAge1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgfVxcbn1cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcbjpnbG9iYWwge1xcbiAgLmdpZl9wbGF5ZXIge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBib3JkZXI6IDJweCBkYXNoZWQgcmdiYSgyMjUsMjI1LCAyMjUsIDAuNSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHBhZGRpbmc6IDE0cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMsIG9wYWNpdHkgMC40cztcXG4gICAgei1pbmRleDogMTtcXG4gIH1cXG5cXG4gIC5naWZfcGxheWVyIC5wbGF5X2J1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC43KTtcXG4gIH1cXG5cXG4gIC5naWZfcGxheWVyIC5wbGF5X2J1dHRvbjo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiR0lGXFxcIjtcXG4gIH1cXG5cXG4gIC5naWZfcGxheWVyLnBsYXlpbmcgLnBsYXlfYnV0dG9uIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIG9wYWNpdHk6IDAuNTtcXG4gIH1cXG59XFxuOmdsb2JhbCB7XFxuICAudGFnIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlNWYzZmY7XFxuICAgIGNvbG9yOiAjMmE4NWZlO1xcbiAgICBwYWRkaW5nOiAwcHggNHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbmFiYixcXG5hY3JvbnltIHtcXG4gIGN1cnNvcjogaGVscDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRibHVlO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiA0cHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcbiVib3hXcmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBwYWRkaW5nOiAyMHB4O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY3ZmM7XFxuICBmb250LWZhbWlseTogJ0hLIEdyb3Rlc2snLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tdG9wOiA3MHB4O1xcbiAgcGFkZGluZzogNDBweCAwIDA7XFxufVxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBjb2xvcjogIzU1NTtcXG4gIHdvcmQtc3BhY2luZzogMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxucCwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgYSwgc3BhbiB7XFxuICAmOjpzZWxlY3Rpb24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgIGNvbG9yOiAkYmxhY2s7XFxuICAgIH1cXG4gIH1cXG59XFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcXG4gIHAsXFxuICBoMSxcXG4gIGgyLFxcbiAgaDMsXFxuICBoNCxcXG4gIGg1LFxcbiAgaDYsXFxuICBhLFxcbiAgc3BhbiB7XFxuICAgIGNvbG9yOiAkYmxhY2s7XFxuICB9XFxufVxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LCB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDE7XFxufVxcbmJ1dHRvbiB7XFxuICAmOmFjdGl2ZSxcXG4gICY6Zm9jdXMge1xcbiAgIG91dGxpbmU6IDAgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheV9saWdodDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICB9XFxufVxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuOmdsb2JhbCB7XFxuICAuZ2lmX3BsYXllciB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGJvcmRlcjogMnB4IGRhc2hlZCByZ2JhKDIyNSwyMjUsIDIyNSwgMC41KTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgcGFkZGluZzogMTRweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cywgb3BhY2l0eSAwLjRzO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJHSUZcXFwiO1xcbiAgfVxcblxcbiAgLmdpZl9wbGF5ZXIucGxheWluZyAucGxheV9idXR0b24ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgb3BhY2l0eTogMC41O1xcbiAgfVxcbn1cXG46Z2xvYmFsIHtcXG4gIC50YWcge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZjNmZjtcXG4gICAgY29sb3I6ICMyYTg1ZmU7XFxuICAgIHBhZGRpbmc6IDBweCA0cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuYWJiLFxcbmFjcm9ueW0ge1xcbiAgY3Vyc29yOiBoZWxwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJsdWU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuJWJveFdyYXBwZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzoxMDAsMTAwaSwzMDAsMzAwaSw0MDAsNDAwaSw1MDAsNTAwaSw3MDAsNzAwaSw5MDAsOTAwaXxDb21mb3J0YWE6MzAwLDQwMCw3MDB8TGF0bzoxMDAsMTAwaSwzMDAsMzAwaSw0MDAsNDAwaSw3MDAsNzAwaSw5MDAsOTAwaXxSYWxld2F5OjEwMCwxMDBpLDIwMCwyMDBpLDMwMCwzMDBpLDQwMCw0MDBpLDUwMCw1MDBpLDYwMCw2MDBpLDcwMCw3MDBpLDgwMCw4MDBpLDkwMCw5MDBpKTtcIiwgXCJcIl0pO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjdmYztcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzaycsIHNhbnMtc2VyaWYgIWltcG9ydGFudDtcXG4gIG1hcmdpbi10b3A6IDcwcHg7XFxuICBwYWRkaW5nOiA0MHB4IDAgMDsgfVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBjb2xvcjogIzU1NTtcXG4gIHdvcmQtc3BhY2luZzogMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcblxcbnA6OnNlbGVjdGlvbiwgaDE6OnNlbGVjdGlvbiwgaDI6OnNlbGVjdGlvbiwgaDM6OnNlbGVjdGlvbiwgaDQ6OnNlbGVjdGlvbiwgaDU6OnNlbGVjdGlvbiwgaDY6OnNlbGVjdGlvbiwgYTo6c2VsZWN0aW9uLCBzcGFuOjpzZWxlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmMzU0MjtcXG4gIGNvbG9yOiAjZmZmOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcXG4gICAgcDo6c2VsZWN0aW9uLCBoMTo6c2VsZWN0aW9uLCBoMjo6c2VsZWN0aW9uLCBoMzo6c2VsZWN0aW9uLCBoNDo6c2VsZWN0aW9uLCBoNTo6c2VsZWN0aW9uLCBoNjo6c2VsZWN0aW9uLCBhOjpzZWxlY3Rpb24sIHNwYW46OnNlbGVjdGlvbiB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICBjb2xvcjogIzJmMzU0MjsgfSB9XFxuXFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDsgfVxcbiAgYSBwLFxcbiAgYSBoMSxcXG4gIGEgaDIsXFxuICBhIGgzLFxcbiAgYSBoNCxcXG4gIGEgaDUsXFxuICBhIGg2LFxcbiAgYSBhLFxcbiAgYSBzcGFuIHtcXG4gICAgY29sb3I6ICMyZjM1NDI7IH1cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDE7IH1cXG5cXG5idXR0b246YWN0aXZlLCBidXR0b246Zm9jdXMge1xcbiAgb3V0bGluZTogMCAhaW1wb3J0YW50OyB9XFxuXFxuYmxvY2txdW90ZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTRiMGJlO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAxMy41cHg7IH1cXG4gIGJsb2NrcXVvdGUgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cXG5cXG5zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7IH1cXG5cXG4uZ2lmX3BsYXllciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcblxcbi5naWZfcGxheWVyIC5wbGF5X2J1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXI6IDJweCBkYXNoZWQgcmdiYSgyMjUsIDIyNSwgMjI1LCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGVmdDogNTAlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHBhZGRpbmc6IDE0cHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzLCBvcGFjaXR5IDAuNHM7XFxuICB6LWluZGV4OiAxOyB9XFxuXFxuLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNyk7IH1cXG5cXG4uZ2lmX3BsYXllciAucGxheV9idXR0b246OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJHSUZcXFwiOyB9XFxuXFxuLmdpZl9wbGF5ZXIucGxheWluZyAucGxheV9idXR0b24ge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCkgcm90YXRlKDE4MGRlZyk7XFxuICBvcGFjaXR5OiAwLjU7IH1cXG5cXG4udGFnIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVmM2ZmO1xcbiAgY29sb3I6ICMyYTg1ZmU7XFxuICBwYWRkaW5nOiAwcHggNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9XFxuXFxuYWJiLFxcbmFjcm9ueW0ge1xcbiAgY3Vyc29yOiBoZWxwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmN2RlYjtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4OyB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy92aXJnaW5pYXZlbGFzcXVlenNvdG8vRnVsbFN0YWNrL01hcmtlclBpbmluYS9zcmMvc3R5bGVzL3NyYy9zdHlsZXMvaW1wb3J0cy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQVNBO0VBQ0UsMEJBQXlCO0VBQ3pCLGlEQUFnRDtFQUNoRCxpQkFBZ0I7RUFDaEIsa0JBQWlCLEVBQ2xCOztBQUNEO0VBQ0Usa0JBQWlCO0VBQ2pCLFlBQVc7RUFDWCxrQkFBaUI7RUFDakIsaUJBQWdCLEVBQ2pCOztBQUNEO0VBRUksMEJBdkJXO0VBd0JYLFlBQVcsRUFLWjtFQUpDO0lBSko7TUFLTSx1QkFBc0I7TUFDdEIsZUEzQlMsRUE2QlosRUFBQTs7QUFFSDtFQUNFLGlDQUFnQyxFQVlqQztFQWJEOzs7Ozs7Ozs7SUFXSSxlQTFDVyxFQTJDWjs7QUFFSDs7Ozs7O0VBTUUsaUJBQWdCO0VBQ2hCLGtCQUFpQixFQUNsQjs7QUFDRDtFQUdHLHNCQUFxQixFQUNyQjs7QUFFSDtFQUNFLG1CQUFrQjtFQUNsQiwwQkE3RGtCO0VBOERsQixtQkFBa0I7RUFDbEIsa0JBQWlCLEVBSWxCO0VBUkQ7SUFNSSxpQkFBZ0IsRUFDakI7O0FBRUg7RUFDRSxvQkFBbUIsRUFDcEI7O0FBQ0Q7RUFFSSxzQkFBcUI7RUFDckIsbUJBQWtCO0VBQ2xCLDBCQUF5QjtFQUN6Qix1QkFBc0I7RUFDdEIsc0JBQXFCO0VBQ3JCLGtCQUFpQjtFQUNqQiw0QkFBMkI7RUFDM0IseUNBQXdDLEVBQ3pDOztBQVZIO0VBYUkscUNBQW9DO0VBQ3BDLDRDQUEwQztFQUMxQyxtQkFBa0I7RUFDbEIseUNBQXdDO0VBQ3hDLFlBQVc7RUFDWCxnQkFBZTtFQUNmLGdCQUFlO0VBQ2YsVUFBUztFQUNULFdBQVU7RUFDVixjQUFhO0VBQ2IsbUJBQWtCO0VBQ2xCLFNBQVE7RUFDUix1REFBc0Q7RUFDdEQseUNBQXdDO0VBQ3hDLFdBQVUsRUFDWDs7QUE1Qkg7RUErQkkscUNBQW9DO0VBQ3BDLHlDQUF3QyxFQUN6Qzs7QUFqQ0g7RUFvQ0ksZUFBYyxFQUNmOztBQXJDSDtFQXdDSSx5REFBd0Q7RUFDeEQsYUFBWSxFQUNiOztBQUVIO0VBRUksaUJBQWdCO0VBQ2hCLGdCQUFlO0VBQ2YsbUJBQWtCO0VBQ2xCLDBCQUF5QjtFQUN6QixlQUFjO0VBQ2QsaUJBQWdCO0VBQ2hCLDRCQUEyQixFQUM1Qjs7QUFFSDs7RUFFRSxhQUFZO0VBQ1osMEJBM0hZO0VBNEhaLFlBQVc7RUFDWCxnQkFBZTtFQUNmLGFBQVk7RUFDWixtQkFBa0IsRUFDbkJcIixcImZpbGVcIjpcImltcG9ydHMuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkYmxhY2s6ICMyZjM1NDI7XFxuJGdyYXlfbGlnaHQ6ICNhNGIwYmU7XFxuJGdyYXlfbWVkaXVtOiAjNzQ3ZDhjO1xcbiRncmF5X2Rhcms6ICM1NzYwNmY7XFxuJHdyaXRlX2dyYXlfMTogI2YxZjJmNjtcXG4kd3JpdGVfZ3JheV8yOiAjZGZlNGVhO1xcbiR3cml0ZV9ncmF5XzM6ICNjZWQ2ZTA7XFxuJGJsdWU6ICMyZjdkZWI7XFxuJGJsdWVfbWVkaXVtOiAjMWI0ZWQ1O1xcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjdmYztcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzaycsIHNhbnMtc2VyaWYgIWltcG9ydGFudDtcXG4gIG1hcmdpbi10b3A6IDcwcHg7XFxuICBwYWRkaW5nOiA0MHB4IDAgMDtcXG59XFxucCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGNvbG9yOiAjNTU1O1xcbiAgd29yZC1zcGFjaW5nOiAycHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG5wLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBhLCBzcGFuIHtcXG4gICY6OnNlbGVjdGlvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgfVxcbiAgfVxcbn1cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xcbiAgcCxcXG4gIGgxLFxcbiAgaDIsXFxuICBoMyxcXG4gIGg0LFxcbiAgaDUsXFxuICBoNixcXG4gIGEsXFxuICBzcGFuIHtcXG4gICAgY29sb3I6ICRibGFjaztcXG4gIH1cXG59XFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMTtcXG59XFxuYnV0dG9uIHtcXG4gICY6YWN0aXZlLFxcbiAgJjpmb2N1cyB7XFxuICAgb3V0bGluZTogMCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5ibG9ja3F1b3RlIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRncmF5X2xpZ2h0O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAxMy41cHg7XFxuICBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG59XFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG46Z2xvYmFsIHtcXG4gIC5naWZfcGxheWVyIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIH1cXG5cXG4gIC5naWZfcGxheWVyIC5wbGF5X2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgYm9yZGVyOiAycHggZGFzaGVkIHJnYmEoMjI1LDIyNSwgMjI1LCAwLjUpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBwYWRkaW5nOiAxNHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzLCBvcGFjaXR5IDAuNHM7XFxuICAgIHotaW5kZXg6IDE7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b246OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIkdJRlxcXCI7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllci5wbGF5aW5nIC5wbGF5X2J1dHRvbiB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxufVxcbjpnbG9iYWwge1xcbiAgLnRhZyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVmM2ZmO1xcbiAgICBjb2xvcjogIzJhODVmZTtcXG4gICAgcGFkZGluZzogMHB4IDRweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5hYmIsXFxuYWNyb255bSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmx1ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG4lYm94V3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgcGFkZGluZzogMjBweDtcXG59XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MTAwLDEwMGksMzAwLDMwMGksNDAwLDQwMGksNTAwLDUwMGksNzAwLDcwMGksOTAwLDkwMGl8Q29tZm9ydGFhOjMwMCw0MDAsNzAwfExhdG86MTAwLDEwMGksMzAwLDMwMGksNDAwLDQwMGksNzAwLDcwMGksOTAwLDkwMGl8UmFsZXdheToxMDAsMTAwaSwyMDAsMjAwaSwzMDAsMzAwaSw0MDAsNDAwaSw1MDAsNTAwaSw2MDAsNjAwaSw3MDAsNzAwaSw4MDAsODAwaSw5MDAsOTAwaScpO1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmN2ZjO1xcbiAgZm9udC1mYW1pbHk6ICdISyBHcm90ZXNrJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXRvcDogNzBweDtcXG4gIHBhZGRpbmc6IDQwcHggMCAwOyB9XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGNvbG9yOiAjNTU1O1xcbiAgd29yZC1zcGFjaW5nOiAycHg7XFxuICBmb250LXdlaWdodDogNDAwOyB9XFxuXFxucDo6c2VsZWN0aW9uLCBoMTo6c2VsZWN0aW9uLCBoMjo6c2VsZWN0aW9uLCBoMzo6c2VsZWN0aW9uLCBoNDo6c2VsZWN0aW9uLCBoNTo6c2VsZWN0aW9uLCBoNjo6c2VsZWN0aW9uLCBhOjpzZWxlY3Rpb24sIHNwYW46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzNTQyO1xcbiAgY29sb3I6ICNmZmY7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcbiAgICBwOjpzZWxlY3Rpb24sIGgxOjpzZWxlY3Rpb24sIGgyOjpzZWxlY3Rpb24sIGgzOjpzZWxlY3Rpb24sIGg0OjpzZWxlY3Rpb24sIGg1OjpzZWxlY3Rpb24sIGg2OjpzZWxlY3Rpb24sIGE6OnNlbGVjdGlvbiwgc3Bhbjo6c2VsZWN0aW9uIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgIGNvbG9yOiAjMmYzNTQyOyB9IH1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50OyB9XFxuICBhIHAsXFxuICBhIGgxLFxcbiAgYSBoMixcXG4gIGEgaDMsXFxuICBhIGg0LFxcbiAgYSBoNSxcXG4gIGEgaDYsXFxuICBhIGEsXFxuICBhIHNwYW4ge1xcbiAgICBjb2xvcjogIzJmMzU0MjsgfVxcblxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMTsgfVxcblxcbmJ1dHRvbjphY3RpdmUsIGJ1dHRvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG5ibG9ja3F1b3RlIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhNGIwYmU7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXNpemU6IDEzLjVweDsgfVxcbiAgYmxvY2txdW90ZSBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcblxcbnNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcblxcbi5naWZfcGxheWVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXFxuLmdpZl9wbGF5ZXIgLnBsYXlfYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlcjogMnB4IGRhc2hlZCByZ2JhKDIyNSwgMjI1LCAyMjUsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY29sb3I6ICNmZmY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBsZWZ0OiA1MCU7XFxuICBvcGFjaXR5OiAxO1xcbiAgcGFkZGluZzogMTRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMsIG9wYWNpdHkgMC40cztcXG4gIHotaW5kZXg6IDE7IH1cXG5cXG4uZ2lmX3BsYXllciAucGxheV9idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC43KTsgfVxcblxcbi5naWZfcGxheWVyIC5wbGF5X2J1dHRvbjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIkdJRlxcXCI7IH1cXG5cXG4uZ2lmX3BsYXllci5wbGF5aW5nIC5wbGF5X2J1dHRvbiB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKSByb3RhdGUoMTgwZGVnKTtcXG4gIG9wYWNpdHk6IDAuNTsgfVxcblxcbi50YWcge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWYzZmY7XFxuICBjb2xvcjogIzJhODVmZTtcXG4gIHBhZGRpbmc6IDBweCA0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7IH1cXG5cXG5hYmIsXFxuYWNyb255bSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY3ZGViO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiA0cHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3ZpcmdpbmlhdmVsYXNxdWV6c290by9GdWxsU3RhY2svTWFya2VyUGluaW5hL3NyYy9zdHlsZXMvc3JjL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFTQTtFQUNFLDBCQUF5QjtFQUN6QixpREFBZ0Q7RUFDaEQsaUJBQWdCO0VBQ2hCLGtCQUFpQixFQUNsQjs7QUFDRDtFQUNFLGtCQUFpQjtFQUNqQixZQUFXO0VBQ1gsa0JBQWlCO0VBQ2pCLGlCQUFnQixFQUNqQjs7QUFDRDtFQUVJLDBCQXZCVztFQXdCWCxZQUFXLEVBS1o7RUFKQztJQUpKO01BS00sdUJBQXNCO01BQ3RCLGVBM0JTLEVBNkJaLEVBQUE7O0FBRUg7RUFDRSxpQ0FBZ0MsRUFZakM7RUFiRDs7Ozs7Ozs7O0lBV0ksZUExQ1csRUEyQ1o7O0FBRUg7Ozs7OztFQU1FLGlCQUFnQjtFQUNoQixrQkFBaUIsRUFDbEI7O0FBQ0Q7RUFHRyxzQkFBcUIsRUFDckI7O0FBRUg7RUFDRSxtQkFBa0I7RUFDbEIsMEJBN0RrQjtFQThEbEIsbUJBQWtCO0VBQ2xCLGtCQUFpQixFQUlsQjtFQVJEO0lBTUksaUJBQWdCLEVBQ2pCOztBQUVIO0VBQ0Usb0JBQW1CLEVBQ3BCOztBQUNEO0VBRUksc0JBQXFCO0VBQ3JCLG1CQUFrQjtFQUNsQiwwQkFBeUI7RUFDekIsdUJBQXNCO0VBQ3RCLHNCQUFxQjtFQUNyQixrQkFBaUI7RUFDakIsNEJBQTJCO0VBQzNCLHlDQUF3QyxFQUN6Qzs7QUFWSDtFQWFJLHFDQUFvQztFQUNwQyw0Q0FBMEM7RUFDMUMsbUJBQWtCO0VBQ2xCLHlDQUF3QztFQUN4QyxZQUFXO0VBQ1gsZ0JBQWU7RUFDZixnQkFBZTtFQUNmLFVBQVM7RUFDVCxXQUFVO0VBQ1YsY0FBYTtFQUNiLG1CQUFrQjtFQUNsQixTQUFRO0VBQ1IsdURBQXNEO0VBQ3RELHlDQUF3QztFQUN4QyxXQUFVLEVBQ1g7O0FBNUJIO0VBK0JJLHFDQUFvQztFQUNwQyx5Q0FBd0MsRUFDekM7O0FBakNIO0VBb0NJLGVBQWMsRUFDZjs7QUFyQ0g7RUF3Q0kseURBQXdEO0VBQ3hELGFBQVksRUFDYjs7QUFFSDtFQUVJLGlCQUFnQjtFQUNoQixnQkFBZTtFQUNmLG1CQUFrQjtFQUNsQiwwQkFBeUI7RUFDekIsZUFBYztFQUNkLGlCQUFnQjtFQUNoQiw0QkFBMkIsRUFDNUI7O0FBRUg7O0VBRUUsYUFBWTtFQUNaLDBCQTNIWTtFQTRIWixZQUFXO0VBQ1gsZ0JBQWU7RUFDZixhQUFZO0VBQ1osbUJBQWtCLEVBQ25CXCIsXCJmaWxlXCI6XCJ2YXJpYWJsZXMuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkYmxhY2s6ICMyZjM1NDI7XFxuJGdyYXlfbGlnaHQ6ICNhNGIwYmU7XFxuJGdyYXlfbWVkaXVtOiAjNzQ3ZDhjO1xcbiRncmF5X2Rhcms6ICM1NzYwNmY7XFxuJHdyaXRlX2dyYXlfMTogI2YxZjJmNjtcXG4kd3JpdGVfZ3JheV8yOiAjZGZlNGVhO1xcbiR3cml0ZV9ncmF5XzM6ICNjZWQ2ZTA7XFxuJGJsdWU6ICMyZjdkZWI7XFxuJGJsdWVfbWVkaXVtOiAjMWI0ZWQ1O1xcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjdmYztcXG4gIGZvbnQtZmFtaWx5OiAnSEsgR3JvdGVzaycsIHNhbnMtc2VyaWYgIWltcG9ydGFudDtcXG4gIG1hcmdpbi10b3A6IDcwcHg7XFxuICBwYWRkaW5nOiA0MHB4IDAgMDtcXG59XFxucCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGNvbG9yOiAjNTU1O1xcbiAgd29yZC1zcGFjaW5nOiAycHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG5wLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBhLCBzcGFuIHtcXG4gICY6OnNlbGVjdGlvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgfVxcbiAgfVxcbn1cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xcbiAgcCxcXG4gIGgxLFxcbiAgaDIsXFxuICBoMyxcXG4gIGg0LFxcbiAgaDUsXFxuICBoNixcXG4gIGEsXFxuICBzcGFuIHtcXG4gICAgY29sb3I6ICRibGFjaztcXG4gIH1cXG59XFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMTtcXG59XFxuYnV0dG9uIHtcXG4gICY6YWN0aXZlLFxcbiAgJjpmb2N1cyB7XFxuICAgb3V0bGluZTogMCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5ibG9ja3F1b3RlIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRncmF5X2xpZ2h0O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAxMy41cHg7XFxuICBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gIH1cXG59XFxuc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG46Z2xvYmFsIHtcXG4gIC5naWZfcGxheWVyIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIH1cXG5cXG4gIC5naWZfcGxheWVyIC5wbGF5X2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gICAgYm9yZGVyOiAycHggZGFzaGVkIHJnYmEoMjI1LDIyNSwgMjI1LCAwLjUpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBwYWRkaW5nOiAxNHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzLCBvcGFjaXR5IDAuNHM7XFxuICAgIHotaW5kZXg6IDE7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNyk7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllciAucGxheV9idXR0b246OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIkdJRlxcXCI7XFxuICB9XFxuXFxuICAuZ2lmX3BsYXllci5wbGF5aW5nIC5wbGF5X2J1dHRvbiB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxufVxcbjpnbG9iYWwge1xcbiAgLnRhZyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVmM2ZmO1xcbiAgICBjb2xvcjogIzJhODVmZTtcXG4gICAgcGFkZGluZzogMHB4IDRweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5hYmIsXFxuYWNyb255bSB7XFxuICBjdXJzb3I6IGhlbHA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmx1ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG4lYm94V3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgcGFkZGluZzogMjBweDtcXG59XFxuJGJsYWNrOiAjMmYzNTQyO1xcbiRncmF5X2xpZ2h0OiAjYTRiMGJlO1xcbiRncmF5X21lZGl1bTogIzc0N2Q4YztcXG4kZ3JheV9kYXJrOiAjNTc2MDZmO1xcbiR3cml0ZV9ncmF5XzE6ICNmMWYyZjY7XFxuJHdyaXRlX2dyYXlfMjogI2RmZTRlYTtcXG4kd3JpdGVfZ3JheV8zOiAjY2VkNmUwO1xcbiRibHVlOiAjMmY3ZGViO1xcbiRibHVlX21lZGl1bTogIzFiNGVkNTtcIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzM3ZDg5OTc0NDlhZDI2ZGJkMzYwYTBjZDdlZWY0NTVhLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzBlYmQ3MjYyMjgyZmIzZTNiMjFmMTA0YjUwZGE1MTJkLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy85YjYwN2RjZGU0OGExMGRlY2NlYzE1MmJlNjBhMjk5YS53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzI1ZTNkN2YxMGM0N2Y2OGUxZjM4MDA3NjhjNmM1NzJjLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2I3MjUxOWNjNDlhMjQwNWYyZjBkMmFlYjY2ZTEwYmRlLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy8wMTJmY2UzYWZhNjAyNzQzMGExMzMzZTZlODI0ZjA3OC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzcxNWJiMzc5YWJmZGVlM2UzYjA2Njc0OTliYTEyODM1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzlmNmNjNzIwODU4ZjM3NDdlNDA4MjUwOGZmYmMxMTA2LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy84Njc4ZmI3ZDM1MTJjMDY1NGFlYWUxMjc2MGUzYjJlNC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzkxM2Q3MTY5NDk5NDc4MWU3YzhmMWM4NWRjZjA5MTc1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzQ5NzdmOGQ3NDVlMDNmOWE3MjM3MzdlYWFmYzhlODdiLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy8zMDExMmRiZmIwZWMyNzc5MzkyY2MwNWM5ZWU2NzY4Ni53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2Q5MGQ3NDBlYTEzZjcxMGRiMDcwN2Y2YTBmMjQ2ZDk5LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzE5YzlkMjM4MjdhMzViMzExODFlZTYyNjBlYmMzOGUyLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy85NmExN2VjOGYzNDM0MGRlYmE5NTY4MzJhOTkwZjg2OC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2MyYzJkYmNiZTlkY2EzNzE4Njc3NzM4ZmMzN2QyNjMxLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzkwNWU2ZTMzM2MyMGViOTM2M2Y0NzY1NzI3MGJhMDMxLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy85ZGMwMmE1MzA1MDc1MjE2NTkyYTEyOGM0OTQ3OGI0Ni53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2RhZDU0ZTM4YzViY2ZkMDA5NDA1NGQ5ZTc4ZmMxZWJkLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzBkMjhkMzdkYTAxMTMxYmExZjU4ODk0NWE2MWEwMzg3LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy80ZTAyMTE3NTg2MWNkMDUzNmNiZDE0YjYyMGQ2OGQ4MC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzJmNTU2YzJiZTFhMDNlMzZiNjdmNzQ1NzMxN2Q5NGI1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzI3YWRiZmE2YWE1NTNkMjI1MWEwNmM5NmFmOTI4MjZkLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9iNWMzYTVmMjFiMWE4NzJlOWUyZjVmNDk5MTc0MzhmOS53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2YwN2EzYTU1Yjg2NTEwMzU5ZTMwNWU5OTY4ODViYTYyLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2IyY2U2Mzc0Zjg2MzAyZTAzNTI2NzZmODBiMWQ1YjVlLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9mYTBhMzEwMjZlMjk0MmVkODE2Mzg1YTFmMTQ5YWY4NC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzZmZmE4MWU2ZjhjYmE3ZmVjNTYxNjBkZGU5ZjA5NmQ1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2NkOGJmODU5OGUzMWVlNDhhMDRiMzA5MzMwNTdjODQ5LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9kMzcyNmNjNTBlYmIxMDM0NThiZDYyYmU4YjY1Y2U2Zi53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzRkNDdmOWFmNWY5ZWQxZDM5MzdlYzFkZTM0NTcwMDk3LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2FjNDM2MmE2NzA4NjRjNmQxYzcwZDM3NzVhZGZmZjFjLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy80ZTEyY2JlOGZlMDY2NTY1MTg2ODg2ZTI3ZjYwNWU2Ni53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzA0NjgzMWY0NmU4ZDJlYWY2OGEzYzgwZTYzYmEzNzQ5LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzAzNDMzNGU5NWNiNDhiMGU2NjNhYzYzZTQ5NTU3NDBkLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9iNWJkMTE2MDBkZmRlYWIyNmViYmM2YjI2Njg1Nzc5ZS53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2RiYWZmZGVhOTMyMjRiZTRkZTM2MGI1YzAwZjNlZTk1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzcyZWVmNzJlOGI2ZWNkOTc1NGYzYmM4MmQwZmZkYWQ5LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9mYTZiOWU2NWE4NjQzNjlhNDllNzI0MGYzNmVmNGFlNS53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzE2NjUzMzkyNWQxMzk5NjVmMWE0MjdiZTliZjdmYTNiLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2ZlMTEyYTgzMWFkN2M1Njk5NDlmYjMxYmZlODBkM2MyLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy85ZGVhNmQ5NzE0Njc0NGE3NmUzY2Y0NmI4MzU1NWE0Yi53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzU1NWNmNTRiYjZlMzM4MmNmN2U1MzY0MzYzZTQzZDlhLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL2Y2YjAwNjZjZGM0MmVkN2QwNGFkYTRhYWYxNWRlZjlmLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy8yZmYyOGIxZGFiNDM4MDZlOGQ0ZWNmZmY2N2ViYTM3Ny53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzNkZTA1MmU4ZGMzMTBlM2I2ZTFkMWZlNzU2M2NmY2RjLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzkwZGVkOGRkNWVhZDMxY2NmNzc5ZDg2NjAzNDZhZDI1LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy83YzRjZmVlMzFiNzk5ZDQ1MGIyZWQ5ZTg1OTM3YzE1NC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzc0YzNhYTQ0ZDIxYTcwNzQwOGNmYjA2OWZlNzFlYzdiLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzQyYjg0MTMyYTVhNmM1YjljY2U2ZWYzM2I2ZTYyMjhkLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9iNWZjNDY5YTNkNmMwYTlmYWMyODJhYjAxZDEyMjY1Yy53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzIzMDYzOTcwMjRkMjQ1ODA3OTJmMTM0NDFjYzVkYzA1LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzNkYzQ4N2VmYzk2MmFmNWM3ZjA4YTU0MjBkYWE1MWMyLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy83NjI1YTJkZWNjYjFjNGViNjZjMDliZGRkNTY5MmExZC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzUxMGUzYjgyZGNiMzgwYzQxMDk0ZjEyMDhlMWU1YjcwLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzM1ZjhkMzBjZGFkYmJiMGE3ZDBmODZlY2VlYTljZjRmLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9jOGE3ZGE3Yjg1YzRjMmJlYjc5OTlhZGUxZDdmMDk3OC53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzUxZDk1ZDRiM2U2MjU0OWE1MTY2ODRiNjE0OWM3MDRlLnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzLzNiNDgxMDEwNTk4NjZlYmQwYWM0ZjhiZGFjYjM5YzAzLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy80ZDI0YjE4ZDMxNDQ0MDBjNTI5Nzg0NTljZDY4YjA1ZS53b2ZmMlwiOyIsImltcG9ydCAnLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2ltcG9ydHMuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWwuc2Nzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9mb250cy5jc3MnO1xuXG4vLyByZXF1aXJlKCd3ZWJwYWNrLWhvdC1taWRkbGV3YXJlL2NsaWVudD9wYXRoPS9fX3dlYnBhY2tfaG1yJnRpbWVvdXQ9MTAwMDAmcmVsb2FkPXRydWUnKTtcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi9mb250cy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTktMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtcmVzb3VyY2VzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMyEuL2ZvbnRzLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTktMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtcmVzb3VyY2VzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMyEuL2ZvbnRzLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi9nbG9iYWwuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOS0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMiEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1yZXNvdXJjZXMtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0zIS4vZ2xvYmFsLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi9nbG9iYWwuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi9pbXBvcnRzLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTktMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtcmVzb3VyY2VzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMyEuL2ltcG9ydHMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTktMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtcmVzb3VyY2VzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMyEuL2ltcG9ydHMuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi92YXJpYWJsZXMuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOS0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTktMiEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1yZXNvdXJjZXMtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0zIS4vdmFyaWFibGVzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS05LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLXJlc291cmNlcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS05LTMhLi92YXJpYWJsZXMuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=
