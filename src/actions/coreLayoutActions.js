/**
 * Created by works on 8/16/2016.
 */
export const TOGGLE_MENU = 'TOGGLE_MENU';

export function openMenu() {
  console.log("openMenu")
  return toggleMenu(true)
}

export function closeMenu() {
  console.log("closeMenu")
  return toggleMenu(false)
}

export function toggleMenu (open = false) {
  return {
    type: TOGGLE_MENU,
    payload: open,
  }
}

export const actions = {
  toggleMenu,
  openMenu,
  closeMenu,
}