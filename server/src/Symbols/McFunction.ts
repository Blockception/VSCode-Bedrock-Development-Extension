/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { MinecraftData } from '../minecraft/Minecraft Data';
import { SymbolInformation, SymbolKind } from 'vscode-languageserver';

export function Convert(Data: MinecraftData, receiver: SymbolInformation[], query: string): void {
	if (query === '') {
		ConvertAll(Data, receiver);
	}
	else {
		ConvertQueried(Data, receiver, query);
	}
}


function ConvertAll(Data: MinecraftData, receiver: SymbolInformation[]) {
	//Convert entities
	Data.Entities.forEach(x => {
		receiver.push(
			SymbolInformation.create(
				x.Identifier,
				SymbolKind.Object,
				x.Location.range,
				x.Location.uri));
	});

	//Convert Objectives
	Data.Objectives.forEach(x => {
		receiver.push(
			SymbolInformation.create(
				x.Name,
				SymbolKind.Variable,
				x.Location.range,
				x.Location.uri));
	});

	//Convert tickingarea
	Data.Sounds.forEach(x => {
		receiver.push(
			SymbolInformation.create(
				x.Name,
				SymbolKind.Package,
				x.Location.range,
				x.Location.uri));
	});

	//Convert Tag
	Data.Tag.forEach(x => {
		receiver.push(
			SymbolInformation.create(
				x.Name,
				SymbolKind.Property,
				x.Location.range,
				x.Location.uri));
	});

	//Convert tickingarea
	Data.TickingAreas.forEach(x => {
		receiver.push(
			SymbolInformation.create(
				x.Name,
				SymbolKind.Package,
				x.Location.range,
				x.Location.uri));
	});
}

function ConvertQueried(Data: MinecraftData, receiver: SymbolInformation[], query: string) {
	//Convert entities
	Data.Entities.forEach(x => {
		if (x.Identifier.indexOf(query) > -1)
			receiver.push(
				SymbolInformation.create(
					x.Identifier,
					SymbolKind.Object,
					x.Location.range,
					x.Location.uri));
	});

	//Convert Objectives
	Data.Objectives.forEach(x => {
		if (x.Name.indexOf(query) > -1)
			receiver.push(
				SymbolInformation.create(
					x.Name,
					SymbolKind.Variable,
					x.Location.range,
					x.Location.uri));
	});

	//Convert tickingarea
	Data.Sounds.forEach(x => {
		if (x.Name.indexOf(query) > -1)
			receiver.push(
				SymbolInformation.create(
					x.Name,
					SymbolKind.Package,
					x.Location.range,
					x.Location.uri));
	});

	//Convert Tag
	Data.Tag.forEach(x => {
		if (x.Name.indexOf(query) > -1)
			receiver.push(
				SymbolInformation.create(
					x.Name,
					SymbolKind.Property,
					x.Location.range,
					x.Location.uri));
	});

	//Convert tickingarea
	Data.TickingAreas.forEach(x => {
		if (x.Name.indexOf(query) > -1)
			receiver.push(
				SymbolInformation.create(
					x.Name,
					SymbolKind.Package,
					x.Location.range,
					x.Location.uri));
	});
}