import * as vscode from "vscode";
import { GetParameters } from "./functions";
export * from "./functions"

export enum SelectorType {
    AllPlayers = "@a",
    AllEntities = "@e",
    NearestPlayer = "@p",
    SelfExecuting = "@s",
    Random = "@r"
}


export class SelectorParameter {
    name : string;
    value : string;

    constructor(name : string, value : string){
        this.name = name;
        this.value = value;
    }

    static Parse(text : string) : SelectorParameter {
        var index = text.indexOf("=");

        var name = text.substring(0, index).trim();
        var value = text.substring(index + 1, text.length).trim();

        return new SelectorParameter(name, value);
    }
}


export class SelectorScores {
    tests : SelectorParameter[];

    constructor(){
        this.tests = new Array();
    }

    isEmpty() : boolean {
        return this.tests == null || this.tests.length === 0
    }

    //Add the given 'scores={}' text to the tests
    Add(text : string) : void {
        text = text.trim();

        if (text.startsWith("scores={")){ text = text.substring(8, text.length); }
        if (text.endsWith("}")) { text = text.substring(0, text.length - 1); }

        var Parameters = GetParameters(text);

        for (var i = 0; i < Parameters.length; i++){
            var P = Parameters[i];
            this.tests.push(SelectorParameter.Parse(P));
        }
    }
    
    hasParameter(name : string) : boolean {
        for (let index = 0; index < this.tests.length; index++) {
            const element = this.tests[index];
            
            if (element.name == name)
                return true;
        }       
        
        return false;
    }

    getParameter(name : string) : SelectorParameter {
        for (let index = 0; index < this.tests.length; index++) {
            const element = this.tests[index];
            
            if (element.name == name)
                return element;
        }       
        
        return null as any;
    }
}

//The selector class
export class Selector {
    prefix : SelectorType;
    parameters : SelectorParameter[];
    scores : SelectorScores;

    constructor() {
        this.prefix = SelectorType.AllEntities;
        this.parameters = new Array();
        this.scores = new SelectorScores();
    }

    hasParameter(name : string) : boolean {
        if (name == "scores"){
            return !this.scores.isEmpty()
        }

        for (let index = 0; index < this.parameters.length; index++) {
            const element = this.parameters[index];
            
            if (element.name == name)
                return true;
        }       
        
        return false;
    }

    getParameter(name : string) : SelectorParameter {
        for (let index = 0; index < this.parameters.length; index++) {
            const element = this.parameters[index];
            
            if (element.name == name)
                return element;
        }       
        
        return null as any;
    }

    countParameter(name : string) : number {
        if (name == "scores"){
            if (this.scores.isEmpty())
                return 0;
            else
                return 1;
        }

        var Out = 0;

        for (let index = 0; index < this.parameters.length; index++) {
            const element = this.parameters[index];
            
            if (element.name == name) Out++;
        }       
        
        return Out;
    }
    
    static Parse(text : string) : Selector {
        var Out = new Selector();

        text = text.trim();
        var Prefix = text.substring(0, 2);

        switch(Prefix){
            case "@a":
                Out.prefix = SelectorType.AllPlayers;
                break;
            case "@e":
                Out.prefix = SelectorType.AllEntities;
                break;
            case "@s":
                Out.prefix = SelectorType.SelfExecuting;
                break;
            case "@r":
                Out.prefix = SelectorType.Random;
                break;
            case "@p":
                Out.prefix = SelectorType.NearestPlayer;
                break;
        }

        if (text.length < 3)
            return Out;

        var Parameters = GetParameters(text);

        for (var i = 0; i < Parameters.length; i++){
            var P = Parameters[i];

            if (P.startsWith("scores")){
                Out.scores.Add(P);
            }
            else{
                Out.parameters.push(SelectorParameter.Parse(P));
            }
        }

        return Out;
    }
}