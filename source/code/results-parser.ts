import { HttpParser } from "./http-parser"

class ResultsParser {
  baseUrl = "results.ocmko.ru"

  getResults = async (): Promise<string[]> => {
    const parser = new HttpParser(this.baseUrl)
    const resultsText = await parser.getElementsTextByClassName("col-md-7")
    const dateRegExp = /\d{2}[/.-]\d{2}[/.-]\d{4}/g
    const resultsArray = resultsText.split(dateRegExp).map(result => result.slice(1))
    return resultsArray.filter(result => result.includes("Единый государственный экзамен"))
  }
}

export const resultsParser = new ResultsParser()