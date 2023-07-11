<script>
    import { getSkill } from "./api";
    import { request } from "./store";

    let name = "";
    let selectedSkills = [];
    let isSkillHided = true;
    $: skills = getSkill(name);

    function addSkill(skill) {
        selectedSkills = [...selectedSkills,skill];
        request.addSkill(skill.id);
    }

    function removeSkill(skill) {
        selectedSkills = selectedSkills.filter(selected=>selected.id!==skill.id);
        request.removeSkill(skill.id);
    }

    function switchHided() {
        isSkillHided = !isSkillHided;
    }
</script>