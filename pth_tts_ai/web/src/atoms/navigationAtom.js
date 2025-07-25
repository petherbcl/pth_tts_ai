import { atom, useRecoilState } from "recoil";

const navigationAtom = atom({
  key: "pageState",
  default: { path: "", lastPath: "" },
});

export const useNavigationState = () => {
  return useRecoilState(navigationAtom);
};

export default navigationAtom;