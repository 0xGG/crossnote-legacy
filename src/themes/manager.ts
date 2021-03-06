import { Editor } from "codemirror";
import { setTheme as VickyMDSetTheme, ThemeName } from "vickymd/theme";
import { VickyMDVersion } from "../editor";
import { DarkTheme } from "./dark";
import { LightTheme } from "./light";
import { OneDarkTheme } from "./one-dark";
import { SolarizedLight } from "./solarized-light";
import { CrossnoteTheme } from "./theme";

export function setTheme({
  editor,
  themeName,
}: {
  editor?: Editor;
  themeName: ThemeName;
}) {
  return VickyMDSetTheme({
    editor,
    themeName,
    baseUri: `${
      window.location.origin.match(/0xgg\./i) ? "/crossnote-legacy" : ""
    }/styles/echomd@${VickyMDVersion}/`,
  });
}

export class ThemeManager {
  public themes: CrossnoteTheme[] = [];
  public selectedTheme: CrossnoteTheme = null;
  public addTheme(theme: CrossnoteTheme) {
    this.themes.push(theme);
    if (!this.selectedTheme) {
      this.selectTheme(theme.name);
    }
  }

  public getTheme(name: string) {
    return this.themes.find((theme) => theme.name === name);
  }

  public selectTheme(name: string) {
    if (!name) {
      return;
    }
    const theme = this.themes.find((t) => t.name === name);
    if (!theme) {
      return;
    }
    this.selectedTheme = theme;
    setTheme({
      themeName: theme.name,
    });
  }
}

const _themeManager = new ThemeManager();
_themeManager.addTheme(LightTheme);
_themeManager.addTheme(DarkTheme);
_themeManager.addTheme(OneDarkTheme);
_themeManager.addTheme(SolarizedLight);

export const themeManager = _themeManager;
