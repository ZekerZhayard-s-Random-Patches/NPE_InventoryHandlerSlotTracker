
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var FieldInsnNode = Java.type("org.objectweb.asm.tree.FieldInsnNode");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

function initializeCoreMod() {
    return {
        "InventoryHandlerSlotTracker_handleOverflow": {
            "target": {
                "type": "METHOD",
                "class": "net/p3pp3rf1y/sophisticatedbackpacks/util/InventoryHandlerSlotTracker",
                "methodName": "handleOverflow",
                "methodDesc": "(Ljava/util/function/UnaryOperator;Lnet/p3pp3rf1y/sophisticatedbackpacks/util/ItemStackKey;Lnet/minecraft/item/ItemStack;)Lnet/minecraft/item/ItemStack;"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.INVOKEINTERFACE && node.owner.equals("java/util/Map")
                        && ((node.name.equals("containsKey") && node.desc.equals("(Ljava/lang/Object;)Z"))
                        || (node.name.equals("get") && node.desc.equals("(Ljava/lang/Object;)Ljava/lang/Object;")))) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP2));
                        mn.instructions.set(node, new VarInsnNode(Opcodes.ALOAD, 4));
                    } else if (node.getOpcode() === Opcodes.IFEQ) {
                        mn.instructions.set(node, new JumpInsnNode(Opcodes.IFNULL, node.label));
                    }
                }
                mn.instructions.insertBefore(insnList[0], new VarInsnNode(Opcodes.ALOAD, 0));
                mn.instructions.insertBefore(insnList[0], new FieldInsnNode(Opcodes.GETFIELD, "net/p3pp3rf1y/sophisticatedbackpacks/util/InventoryHandlerSlotTracker", "fullStackSlots", "Ljava/util/Map;"));
                mn.instructions.insertBefore(insnList[0], new VarInsnNode(Opcodes.ALOAD, 2));
                mn.instructions.insertBefore(insnList[0], new MethodInsnNode(Opcodes.INVOKEINTERFACE, "java/util/Map", "get", "(Ljava/lang/Object;)Ljava/lang/Object;", true));
                mn.instructions.insertBefore(insnList[0], new VarInsnNode(Opcodes.ASTORE, 4));
                return mn;
            }
        }
    }
}
