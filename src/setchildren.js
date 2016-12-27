import { mount, unmount } from './mount';

export function setChildren (parent, children) {
  const parentEl = parent.el || parent;
  let traverse = parentEl.firstChild;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (!child) {
      continue;
    }

    const childEl = child.el || child;

    if (childEl === traverse) {
      traverse = traverse.nextSibling;
      continue;
    }

    mount(parent, child, traverse);
  }

  while (traverse) {
    const next = traverse.nextSibling;

    if (!traverse.dontRemoveMe) {
      unmount(parent, traverse);
    }

    traverse = next;
  }
}
