import { Box, Button, Collapse, Toolbar } from "@mui/material";
import { useState } from "react";
import "../styles/showmoretext.css";
const ShowMoreText = (props) => {
  //States >>
  const [show, setShow] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);

  //Constants >>

  //Functions >>
  const toggleShow = (value) => {
    if (value) {
      setEllipsis(false);
      setShow(true);
    } else {
      setTimeout(() => {
        setEllipsis(true);
      }, 500);
      setShow(false);
    }
  };
  //Hooks >>

  return (
    <Box>
      <Toolbar />
      <Collapse in={show} collapsedSize={60}>
        <Box component={"div"} className={ellipsis ? "show-off" : ""}>
          Once upon a time, in a faraway land, there was a kingdom ruled by a
          just and wise king. The kingdom was a land of great beauty, with lush
          green forests, snow-capped mountains, and sparkling rivers that flowed
          through the countryside. The people of the kingdom were happy and
          prosperous, and they lived in peace and harmony with one another. One
          day, a dark cloud descended upon the kingdom. A powerful sorcerer had
          come to claim the throne, and he had brought with him an army of
          fierce warriors and terrifying beasts. The king and his army fought
          valiantly, but they were no match for the sorcerer's magic. The king
          was captured and thrown into the sorcerer's dungeon, and the kingdom
          was plunged into darkness. For many years, the people of the kingdom
          lived in fear and despair. The sorcerer ruled with an iron fist, and
          his minions roamed the land, terrorizing the people and destroying
          everything in their path. But despite their suffering, the people of
          the kingdom did not lose hope. They believed that one day, a hero
          would arise to defeat the sorcerer and restore the kingdom to its
          former glory. And so it was that a young orphan boy, named Jack, set
          out on a quest to save the kingdom. Armed with nothing but his wits
          and a fierce determination, Jack traveled across the land, battling
          the sorcerer's minions and searching for a way to defeat the sorcerer
          himself. After many long and difficult months, Jack finally came
          face-to-face with the sorcerer in his fortress at the top of a great
          mountain. The sorcerer laughed at Jack's bravery, but Jack was not
          afraid. He drew his sword and charged forward, ready to do battle with
          the sorcerer. The battle was long and grueling, but Jack never gave
          up. He dodged the sorcerer's spells and parried his attacks, fighting
          with all his might. Finally, with one swift blow, Jack struck down the
          sorcerer and freed the kingdom from his tyranny. The people of the
          kingdom rejoiced and welcomed Jack as their hero. The king was freed
          from his dungeon and restored to his throne, and the land was once
          again filled with light and beauty. And Jack, who had once been a
          lowly orphan boy, was hailed as a champion and a legend, his name
          remembered for generations to come.
        </Box>
      </Collapse>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => toggleShow(!show)}>
          {show ? "Show less" : "Show more"}
        </Button>
      </Box>
    </Box>
  );
};
export default ShowMoreText;
