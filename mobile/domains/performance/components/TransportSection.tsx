import { PerformanceDetail } from "@/domains/performance/types";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  performance: PerformanceDetail;
};

export const TransportSection = ({ performance }: Props) => {
  return (
    <View className="p-4">
      {/* 주차장 태그 */}
      {performance.hasParking && (
        <View className="mb-6">
          <View
            className="px-1.5 py-0.5 rounded-[10px] border w-[167px] h-5"
            style={{
              backgroundColor: "#FFF5A6",
              borderColor: "#C3C3C3",
            }}
          >
            <Text
              className="text-xs text-black"
              style={{ fontFamily: "Inter" }}
            >
              자체 주차장이 있는 공연장이에요
            </Text>
          </View>
        </View>
      )}

      {/* 경로 정보 */}
      <View className="mb-5">
        <Text
          className="text-[11px] font-semibold text-black mb-4"
          style={{ fontFamily: "Noto Sans KR" }}
        >
          우리집에서의 경로
        </Text>

        <View className="flex-row gap-4">
          {/* 대중교통 */}
          <View className="flex-1">
            <Image
              source={
                performance.transportInfo?.publicTransport.image || {
                  uri: "https://picsum.photos/154/153?random=1",
                }
              }
              className="w-full h-[153px] rounded-lg bg-gray-100 border border-[#9B9B9B]"
            />
            <Text
              className="text-[10px] text-black text-center mt-2"
              style={{ fontFamily: "Noto Sans KR" }}
            >
              대중교통 소요시간{" "}
              {performance.transportInfo?.publicTransport.duration || "43분"}
            </Text>
          </View>

          {/* 자가용 */}
          <View className="flex-1">
            <Image
              source={
                performance.transportInfo?.car.image || {
                  uri: "https://picsum.photos/154/153?random=2",
                }
              }
              className="w-full h-[153px] rounded-lg bg-gray-100 border border-[#9B9B9B]"
            />
            <Text
              className="text-[10px] text-black text-center mt-2"
              style={{ fontFamily: "Noto Sans KR" }}
            >
              자가용 소요시간{" "}
              {performance.transportInfo?.car.duration || "20분"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
