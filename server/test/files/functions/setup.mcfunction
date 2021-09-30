# Summons a chicken and plays a found
summon example:chicken -1 -1 -1 example.specialevent
playsound example.pling @a
tag @a remove Mother
tag @a remove Killing

execute @a ~~~ tellraw @a { "text": "" }
execute @a ~ ~ ~ tellraw @a { "text": "" }

playsound block.itemframe.rotate_item @s ~ ~ ~ 0.00 0.00 0.00

summon alien:mother ~ ~ ~ 