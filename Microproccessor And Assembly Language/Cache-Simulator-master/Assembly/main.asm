.386
.model flat, stdcall
.stack 4096
ExitProcess PROTO , dwExitCode: DWORD
.data
	cacheHit DWORD 0
	cacheMiss DWORD 0
	hitRate DWORD 0
	block BYTE 512 DUP(0) ;since block is Byte type array. We treat least four bits of each element
							;as a tag 5th last as valid bit
							;for e.g block[0]=00001010, validBit=0,tag=1010
	addresses WORD 900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915
.code
main PROC
	mov ecx,0

do1:
	mov eax,0
	mov ebx,0
		mov ax,addresses[ecx] ;using ax as to get the block number
		shr ax,3
		and ax,0000000111111111b
		mov bx,addresses[ecx] ;using bx to get the block tag
		shr ebx,28
		or bl,00010000b

		movzx edx,ax
		mov al,block[edx]

		CMP al,bl
		JE hit
		add cacheMiss,1
		mov block[edx],bl
		JMP end_if
		hit:add cacheHit,1
	
	end_if:
	add ecx,2
	CMP ecx,SIZEOF addresses
	JL do1
end_wh:
	INVOKE ExitProcess, 0
main ENDP
END main
