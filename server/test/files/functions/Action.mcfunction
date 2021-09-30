function setup
replaceitem entity @a slot.hotbar 0 diamond_sword 1 0 { "minecraft:can_destroy": { "blocks": [ "grass" ] }, "minecraft:can_place_on": { "blocks": [ "grass" ] }, "minecraft:lock_in_inventory":{}, "minecraft:keep_on_death":{}, "minecraft:lock_in_slot":{} }

scoreboard objectives add test dummy "Value"
execute @e[scores={test=..-1}] ~ ~ ~ 
tag @s add some
tag @s add foo

# This is a comment
execute @e[tag=foo,tag=some] ~ ~ ~ say hi
execute @e[scores={test=12..},tag=some,type=minecraft:armor_stand] ~ ~ ~ 
execute @e[tag=some,type=minecraft:armor_stand,scores={test=1..}] ~ ~ ~ tellraw @a { "translate": "", "with": { "rawtext": [] } }

dialogue open @initiator @a ""

dialogue open @s @s "something"

execute @a ~ ~ ~ detect ~ ~ ~ minecraft:air -1 camerashake add @s 0 10 positional


event entity @e[type=minecraft:cow] abort_sheltering