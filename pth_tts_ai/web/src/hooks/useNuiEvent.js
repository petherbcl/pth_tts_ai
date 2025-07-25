import { useEffect, useRef } from "react";
import { noop } from "../utils/misc";

/**
 * A hook that manages events listeners for receiving data from the client scripts
 * @param {string} action - The specific `action` that should be listened for.
 * @param {Function} handler - The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent('setVisible', (data) => {
 *   // whatever logic you want
 * })
 **/
export const useNuiEvent = (action, handler) => {
    const savedHandler = useRef(noop);

    // Make sure we handle for a reactive handler
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event) => {
            const { action: eventAction, data } = event.data;

            if (savedHandler.current) {
                if (eventAction === action) {
                    savedHandler.current(data);
                }
            }
        };

        window.addEventListener("message", eventListener);
        // Remove Event Listener on component cleanup
        return () => window.removeEventListener("message", eventListener);
    }, [action]);
};