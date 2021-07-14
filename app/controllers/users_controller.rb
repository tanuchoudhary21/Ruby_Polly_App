class UsersController < ApplicationController

    def index
        users = User.all.as_json(only: %i[id first_name])
        render status: :ok, json: { users: users }
      end

      def create
        @user = User.new(user_params)
          if @user.save
        render status: :ok, json: { notice: 'User successfully created' }
          else
            errors = @user.errors.full_messages.to_sentence
            render status: :unprocessable_entity, json: { errors: errors }
        end
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      end
end