// let events;
// if(this.state.events) {
//   console.log(this.state.events);
//   events = this.state.events.map((e) => {
//     let eventTitle = '';
//     if (e.title_tag_line) {
//       // console.log("tag_line");
//       // console.log(e.title_tag_line);
//       eventTitle = e.title_tag_line;
//     } else if (e.subtitle.includes("vs")) {
//       let subtitle = e.subtitle.split(" ");
//       let subtitleFormatted = '';
//       for (let i = 0; i < subtitle.length; i++) {
//         subtitle[i] = subtitle[i].toLowerCase();
//         subtitle[i] = subtitle[i].charAt(0).toUpperCase() + subtitle[i].substring(1);
//         subtitleFormatted += subtitle[i] + " ";
//       }
//       // console.log("subtitle");
//       // console.log(subtitleFormatted);
//       eventTitle = subtitleFormatted;
//     } else {
//       if (e.url_name.startsWith("UFC")) {
//         if (e.url_name.includes("125")) {
//           let name = e.url_name.split("1");
//           name = name[0] + " 1" + name[1];
//           // console.log("starts with UFC");
//           // console.log(name);
//           eventTitle = name;
//         } else {
//           let name = e.url_name.split("-");
//           name = name[0] + " " + name[1];
//           // console.log("starts with UFC");
//           // console.log(name);
//           eventTitle = name;
//         }
//       } else if (e.url_name.includes("Fighter")) {
//           let ultimate = e.url_name.split("-");
//           let ultimateFighter = '';
//           for (let i = 0; i < ultimate.length; i++) {
//             ultimateFighter += ultimate[i] + " ";
//           }
//           // console.log("Includes fighter")
//           // console.log(ultimateFighter);
//           eventTitle = ultimateFighter;
//       } else if (e.url_name.startsWith("Ultimate")) {
//         let ultimate = e.url_name.split("-");
//         if (ultimate.length > 2) {
//           ultimate = ultimate[1] + " " + ultimate[2];
//           // console.log("starts with Ultimate");
//           // console.log(ultimate);
//           eventTitle = ultimate;
//         } else {
//           ultimate = ultimate[0] + " " + ultimate[1];
//           // console.log("starts with Ultimate");
//           // console.log(ultimate);
//           eventTitle = ultimate;
//         }
//       } else if (e.url_name.includes("troops")) {
//           let ultimate = e.url_name.split("-");
//           let fightForTheTroops = '';
//           for (let i = 0; i < ultimate.length; i++) {
//             ultimate[i] = ultimate[i].charAt(0).toUpperCase() + ultimate[i].substring(1);
//             fightForTheTroops += ultimate[i] + " ";
//           }
//           // console.log("Includes troops")
//           // console.log(fightForTheTroops);
//           eventTitle = fightForTheTroops;
//       } else {
//         // console.log("url_name");
//         // console.log(e.url_name);
//         eventTitle = e.url_name;
//       }
//     }
//
//     // if (eventTitle.includes("vs.")) {
//     //   eventTitle = eventTitle.split("vs.");
//     // } else {
//     //   eventTitle = eventTitle.split("vs");
//     // }
//     // eventTitle = e.base_title;
//     console.log(eventTitle);
//     return <div>
//       <Link className="link event-title" to={{pathname: `/event`, state: {eventID: e.id} }}>
//         {eventTitle}
//       </Link>
//     </div>
//   })
// }
