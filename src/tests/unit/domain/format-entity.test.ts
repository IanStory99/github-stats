/* eslint-disable @typescript-eslint/no-empty-function */
import { FormatEntity } from "@/domain/entities";

describe("FormatEntity", () => {
  describe("getFormatType", () => {
    it("should return the format type", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      expect(format.getFormatType()).toBe("formatType");
    });
  });

  describe("getFormatData", () => {
    it("should return the format data", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      expect(format.getFormatData()).toBe("formatData");
    });
  });

  describe("getSaveToFileFunction", () => {
    it("should return the save to file function", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      expect(format.getSaveToFileFunction()).toBeInstanceOf(Function);
    });
  });

  describe("saveToFile", () => {
    it("should call the save to file function", () => {
      const saveToFileFunction = jest.fn();
      const format = new FormatEntity("formatType", "formatData", saveToFileFunction);

      format.saveToFile();

      expect(saveToFileFunction).toHaveBeenCalled();
    });
  });

  describe("setFormatType", () => {
    it("should set the format type", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      format.setFormatType("newFormatType");

      expect(format.getFormatType()).toBe("newFormatType");
    });
  });

  describe("setFormatData", () => {
    it("should set the format data", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      format.setFormatData("newFormatData");

      expect(format.getFormatData()).toBe("newFormatData");
    });
  });

  describe("setSaveToFileFunction", () => {
    it("should set the save to file function", () => {
      const format = new FormatEntity("formatType", "formatData", () => { });

      format.setSaveToFileFunction(() => { });

      expect(format.getSaveToFileFunction()).toBeInstanceOf(Function);
    });
  });
});