
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "Font_<init>": {
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
                    if (node.getOpcode() === Opcodes.INVOKEINTERFACE && node.owner.equals("java/util/Map") && node.name.equals("containsKey") && node.desc.equals("(Ljava/lang/Object;)Z")) {
                        mn.instructions.set(node, new MethodInsnNode(Opcodes.INVOKEINTERFACE, "java/util/Map", "get", "(Ljava/lang/Object;)Ljava/lang/Object;", true));
                    } else if (node.getOpcode() === Opcodes.IFEQ) {
                        mn.instructions.set(node, new JumpInsnNode(Opcodes.IFNULL, node.label));
                    }
                }
                return mn;
            }
        }
    }
}
