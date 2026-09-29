// Owner-approved copy takes precedence over automatic translation. Never touch
// link destinations, source archives, form values, scripts or structured data.
export function normalizeRobinName(text) {
  return text.replace(/(?:罗宾|羅賓)(?:[\s·・]*[谢謝](?:伊)?)?/g, '谢玢');
}

export function createEditorialLayer(doc) {
  const packet = doc.getElementById('about-owner-copy');
  const copy = packet ? JSON.parse(packet.textContent) : {};
  const slots = [...doc.querySelectorAll('[data-about-copy]')].map(node => ({
    node, original: node.textContent, translate: node.getAttribute('translate'),
    protected: node.classList.contains('notranslate'),
  }));
  const changed = new Map();
  const attributes = new Map();
  const nameSlots = [];
  let observer;
  function stop() {
    observer?.disconnect();
    for (const [node, value] of changed) {
      if (node.nodeValue === value.after) node.nodeValue = value.before;
    }
    changed.clear();
    for (const [node, values] of attributes) for (const [key, value] of values) {
      if (node.getAttribute(key) === value.after) node.setAttribute(key, value.before);
    }
    attributes.clear();
  }
  function restore() {
    stop();
    for (const {wrapper, original} of nameSlots) wrapper.replaceWith(original);
    nameSlots.length = 0;
    for (const slot of slots) {
      slot.node.textContent = slot.original;
      slot.node.classList.toggle('notranslate', slot.protected);
      if (slot.translate === null) slot.node.removeAttribute('translate');
      else slot.node.setAttribute('translate', slot.translate);
    }
  }
  function apply(lang) {
    let count = 0;
    for (const { node } of slots) {
      const value = lang === 'en' ? node.dataset.aboutEn : copy[lang]?.[node.dataset.aboutCopy];
      if (value !== undefined) {
        node.textContent = value;
        node.classList.add('notranslate');
        node.setAttribute('translate', 'no');
        count++;
      }
    }
    return count > 0;
  }
  function protectNames(lang) {
    if (!['zh-CN','zh-TW'].includes(lang)) return;
    const walker = doc.createTreeWalker(doc.body,4);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement?.closest('script,style,code,pre,textarea,input,[contenteditable],[data-private],.notranslate,[data-about-copy]')) continue;
      // Protect identity tokens before the provider splits or reorders them.
      const parts = node.nodeValue.split(/(\bRobin(?:\s+Xie)?\b|谢玢|謝玢)/g);
      if (parts.length === 1) continue;
      const wrapper = doc.createElement('span');
      parts.forEach((part,i) => {
        if (i % 2) {
          const name = doc.createElement('span');
          name.className = 'notranslate';
          name.setAttribute('translate','no');
          name.textContent = '谢玢';
          wrapper.append(name);
        } else wrapper.append(doc.createTextNode(part));
      });
      node.replaceWith(wrapper);
      nameSlots.push({wrapper,original:node});
    }
  }
  function names(lang) {
    if (!['zh-CN', 'zh-TW'].includes(lang)) return;
    function fix(root) {
      const elements = root.nodeType === 1 ? [root, ...root.querySelectorAll('[aria-label],[title],[alt]')] : [];
      for (const node of elements) {
        if (node.closest('script,style,code,pre,textarea,input,[contenteditable],[data-private]')) continue;
        for (const key of ['aria-label','title','alt']) {
          const before = node.getAttribute(key);
          if (!before) continue;
          const after = normalizeRobinName(before);
          if (after !== before) {
            if (!attributes.has(node)) attributes.set(node, new Map());
            attributes.get(node).set(key, {before,after});
            node.setAttribute(key,after);
          }
        }
      }
      const walker = doc.createTreeWalker(root, 4);
      const nodes = root.nodeType === 3 ? [root] : [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        if (node.parentElement?.closest('script,style,code,pre,textarea,input,[contenteditable],[data-private]')) continue;
        const before = node.nodeValue;
        const after = normalizeRobinName(before);
        if (after !== before) { changed.set(node, { before, after }); node.nodeValue = after; }
      }
    }
    fix(doc.documentElement);
    observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'characterData' || record.type === 'attributes') fix(record.target);
        else record.addedNodes.forEach(fix);
      }
    });
    observer.observe(doc.documentElement, { subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: ['aria-label','title','alt'] });
  }
  return { restore, apply, names, protectNames };
}
