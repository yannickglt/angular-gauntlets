const elementsPanel = chrome && chrome.devtools && chrome.devtools.panels && chrome.devtools.panels.elements;
if (elementsPanel) {
  elementsPanel.createSidebarPane('Angular', function onSidebarCreated(sidebar) {
    elementsPanel.onSelectionChanged.addListener(function updateElementProperties() {
      sidebar.setExpression('(' + getPanelContents.toString() + ')()');
    });
  });
}

function getPanelContents() {
  let debugElement = null;
  let componentInstance = null;
  let context = null;
  let providers = null;
  let detectChanges = () => null;

  const ng = window.ng;
  if ($0 && ng) {
    if (ng.probe && ng.probe($0)) {
      debugElement = ng.probe($0) || null;
      componentInstance = debugElement.componentInstance;
      context = debugElement.context.$implicit ? debugElement.context.$implicit : debugElement.context;
      providers = getProviders(debugElement, ng) || getLegacyProviders(debugElement, ng);
      detectChanges = () => debugElement.injector.get(ng.coreTokens.ApplicationRef).tick();
    } else {
      componentInstance = ng.getComponent($0)
      context = ng.getContext($0)
      detectChanges = () => ng.applyChanges(componentInstance)
    }
  }

  logObservable = obs => {
    if (obs && obs.subscribe) {
      var sub = obs.subscribe(value => {
        console.log(value)
        try {
          sub.unsubscribe()
        } catch {}
      })
    }
  }

  exportToWindow(debugElement, componentInstance, context, providers, detectChanges, logObservable);

  return {
    debugElement,
    componentInstance,
    context,
    providers
  };

  function exportToWindow(debugElement, componentInstance, context, providers, detectChanges, logObservable) {
    window.$debugElement = debugElement;
    window.$component = componentInstance;
    window.$context = context;
    window.$providers = providers;
    window.$scope = componentInstance || context; // AngularJS Batarang compatibility
    window.$detectChanges = detectChanges;
    window.log$ = logObservable;
  }

  // Angular 4+
  function getProviders(debugElement, ng) {
    const injector = debugElement.injector.get(ng.coreTokens.ApplicationRef)._injector;
    const providers = {};
    if (injector && injector._providers) {
      injector._providers
        .forEach(provider => {
          const key = provider && provider.constructor ? provider.constructor.name : String(provider);
          providers[lowerFirst(key)] = provider;
        });
      return providers;
    } else {
      return null;
    }
  }

  // Angular 2-3
  function getLegacyProviders(debugElement, ng) {
    const injector = debugElement.injector.get(ng.coreTokens.ApplicationRef)._injector;
    if (injector) {
      const providers = {};
      for (const key in injector) {
        const res = /_([A-Z]+[^_]*)_+\d+/.exec(key);
        if (res && res[1]) {
          const providerName = res[1];
          providers[lowerFirst(providerName)] = injector[key];
        }
      }
      return providers;
    } else {
      return null;
    }
  }

  function lowerFirst(str) {
    str = String(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

}
