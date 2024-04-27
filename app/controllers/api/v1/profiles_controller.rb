class Api::V1::ProfilesController < ApplicationController
    before_action :set_user, only: %i[ show update destroy ]
    def index 
        if current_user 
            
            render json: { user: current_user, profile: current_user.profile}
        else 
            render json: "Not Authorized", status: :unprocessable_entity
        end
     
      end

    def show 
        render json: { user: @user, profile: @user.profile}
    end

    def update 
        if @user.profile.update(request_params)
            render json: { user: @user, profile: @user.profile}
          else
            render json: @request.errors, status: :unprocessable_entity
          end
    end 

    def destroy
        @user.destroy!
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def profile_params
        params.require(:profile).permit(:first_name, :last_name, :phone_number, :city, :about_me, :avatar)
    end
end
