import { MolangData } from "bc-minecraft-molang";
import { SignatureHelp, SignatureInformation } from "vscode-languageserver-types";
import { OnDocumentFormatRequestAsync } from '../../../Format/OnRequest';
import { SignatureCarrier } from "../../../Signatures/Carrier";
import { TextDocument } from "../../../Types/Document/TextDocument";
import { GetDataSet } from "../General/GetDataSet";

/**
 *
 * @param fn
 * @param doc
 */
export function ProvideSignature(fn: string | undefined): SignatureHelp | undefined {
  if (!fn) {
    return QuerySignature;
  }

  const sign: SignatureHelp = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [],
  };

  GenerateItems(MolangData.General.Queries, fn, sign.signatures);

  return sign;
}

function GenerateItems(items: MolangData.MolangFunction[], query: string, receiver: SignatureInformation[]) {
  for (let I = 0; I < items.length; I++) {
    const item = items[I];
    if (item.id === query) {
      receiver.push(SignatureCarrier.get(items[I], GenerateItem));
    }
  }
}

function GenerateItem(item: MolangData.MolangFunction): SignatureInformation {
  const out = {
    label: item.id,
    activeParameter: 0,
    documentation: item.documentation ?? "query",
    parameters: [
        { label: "query", documentation: "query" },
        { label: item.id, documentation: item.documentation},
    ]
  };

  if (item.parameters) {
    out.parameters[1].label += '(';

    out.parameters = out.parameters .concat(item.parameters.map(p=>{
        return { label: p.id, documentation: p.documentation }
    }));
  } 

  return out;
}

const QuerySignature: SignatureHelp = {
  activeParameter: 1,
  activeSignature: 0,
  signatures: [
    {
      label: "Query",
      parameters: [
        { label: "query.", documentation: "The query to use." },
        { label: "<query>", documentation: "The function" },
      ],
    },
  ],
};
