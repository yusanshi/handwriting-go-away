declare module 'raw-loader!*.md';

declare let FontFace: any;

type formSelectData = { value: string; text: string }[];

type marginType = { top: number; right: number; bottom: number; left: number };

// TODO
interface paperSizeType {
  [key: string]: {
    width: number;
    height: number;
    defaultFontSize: number;
  };
}

// TODO
interface photoLinePaperType {
  [key: string]: {
    direction: string;
    lineCount: number;
    margin: marginType;
  };
}

interface formType {
  text: string;
  paper: {
    source: string;
    hasLine: boolean;
    paper: string;
    upload: null;
    size: string;
    direction: string;
    lineCount: number;
    marginInText: string;
    margin: marginType;
    backgroundColor: string;
  };
  character: {
    font: string;
    upload: null;
    scale: number;
    color: string;
    spacing: number;
  };
  simulation: {
    textEffect: {
      shadow: {
        color: string;
        offset: {
          horizontal: number;
          vertical: number;
        };
        radius: number;
      };
      blurRadius: number;
      opacity: number;
      distortion: number;
    };
    randomOffset: {
      lineBeginning: number;
      horizontal: number;
      vertical: number;
    };
    paperRotation: number;
  };
}

interface CanvasRenderingContext2D {
  fillTextExtended(
    text: string,
    x: number,
    y: number,
    charSpace: number,
    _distortion: number,
    horizontalOffset: number,
    verticalOffset: number
  ): void;

  measureTextExtended(text: string, charSpace: number): any;

  typesetText(text: string, charSpace: number, lineWidth: number): string[];
}
