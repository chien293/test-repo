// DragonSpine.tsx
import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi/spine-pixi";

const DragonSpine = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application();
    app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    }).then(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // clear old
        containerRef.current.appendChild(app.canvas);
      }

      (async () => {
        // Tải Spine data
        PIXI.Assets.add({alias: "spineboyData", src: "/dragon/dragon.json"});
        PIXI.Assets.add({alias: "spineboyAtlas", src: "/dragon/dragon.atlas"});
        const spineData = await PIXI.Assets.load("spineboyData");
        const atlasData = await PIXI.Assets.load("spineboyAtlas");
        const spineDragon = Spine.from({skeleton: "spineboyData", atlas: "spineboyAtlas", scale: 0.5});
        console.log(spineDragon);
        
        // Thiết lập vị trí ban đầu
        spineDragon.x = 100; // Bắt đầu từ bên trái
        spineDragon.y = app.renderer.height / 2;
        spineDragon.scale.set(0.5);
        
        // Thiết lập animation bay
        spineDragon.state.setAnimation(0, "flying", true);
        
        // Biến để theo dõi hướng di chuyển
        let direction = 1; // 1 = sang phải, -1 = sang trái
        let speed = 2; // Tốc độ di chuyển
        
        // Hàm cập nhật vị trí con rồng
        const updateDragonPosition = () => {
          // Cập nhật vị trí theo hướng
          spineDragon.x += speed * direction;
          
          // Đổi hướng khi chạm biên
          if (spineDragon.x >= app.renderer.width - 100) {
            direction = -1;
            spineDragon.scale.x = -0.5; // Lật ngược con rồng
          } else if (spineDragon.x <= 100) {
            direction = 1;
            spineDragon.scale.x = 0.5; // Lật lại con rồng
          }
          
          // Tiếp tục animation
          requestAnimationFrame(updateDragonPosition);
        };
        
        // Bắt đầu animation di chuyển
        updateDragonPosition();

        app.stage.addChild(spineDragon);

      })();
    });

    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={containerRef} />;
};

export default DragonSpine;
