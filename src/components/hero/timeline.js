// Scene timeline in seconds-of-scene-time. It is never played by a timer: scroll progress is mapped onto it.
export const T = { reveal: 1.4, send: 2.6, blast: 4.6, trans: 5.9, end: 7.6 }
// Scroll progress range (0..1 through the pinned section) that maps onto 0..T.end.
// Before P0 the page just shows the welcome hero; after P1 the sequence is complete.
export const P0 = 0.07
export const P1 = 0.93
export const pToT = (p) => Math.min(1, Math.max(0, (p - P0) / (P1 - P0))) * T.end
