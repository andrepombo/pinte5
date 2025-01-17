import React from "react";

const LayoutStateContext = React.createContext();
const LayoutDispatchContext = React.createContext();

function layoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function LayoutProvider({ children }) {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: true, // Default state
  });

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

// Action function to toggle sidebar
function toggleSidebar(dispatch) {
  if (!dispatch) {
    throw new Error("Dispatch is required to toggle sidebar");
  }
  dispatch({ type: "TOGGLE_SIDEBAR" });
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };
